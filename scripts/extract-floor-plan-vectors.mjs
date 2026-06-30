import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const input = path.join(
  root,
  "production/floor-plan-video/assets/source/03-spatial-graph.png",
);
const output = path.join(root, "src/data/floor-plan-process.json");

const { data, info } = await sharp(input)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const width = info.width;
const height = info.height;
const candidates = [];

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const offset = (y * width + x) * 3;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    if (r < 100 && g < 100 && b > 140) candidates.push([x, y]);
  }
}

const parent = candidates.map((_, index) => index);
const find = (index) => {
  if (parent[index] !== index) parent[index] = find(parent[index]);
  return parent[index];
};
const union = (left, right) => {
  const leftRoot = find(left);
  const rightRoot = find(right);
  if (leftRoot !== rightRoot) parent[rightRoot] = leftRoot;
};

// Node circles are crossed by red edges in the raster output. A small-radius
// union reconnects the blue fragments without joining neighboring nodes.
for (let left = 0; left < candidates.length; left += 1) {
  for (let right = left + 1; right < candidates.length; right += 1) {
    if (candidates[right][1] - candidates[left][1] > 5) break;
    if (
      Math.abs(candidates[right][0] - candidates[left][0]) <= 5 &&
      Math.abs(candidates[right][1] - candidates[left][1]) <= 5
    ) {
      union(left, right);
    }
  }
}

const clusters = new Map();
candidates.forEach((point, index) => {
  const cluster = find(index);
  if (!clusters.has(cluster)) clusters.set(cluster, []);
  clusters.get(cluster).push(point);
});

const rawNodes = [...clusters.values()]
  .filter((points) => points.length > 3)
  .map((points) => ({
    x: Math.round(points.reduce((sum, point) => sum + point[0], 0) / points.length),
    y: Math.round(points.reduce((sum, point) => sum + point[1], 0) / points.length),
  }))
  .sort((left, right) => left.y - right.y || left.x - right.x);

const isRed = (x, y) => {
  const roundedX = Math.round(x);
  const roundedY = Math.round(y);
  if (roundedX < 0 || roundedY < 0 || roundedX >= width || roundedY >= height) {
    return false;
  }
  const offset = (roundedY * width + roundedX) * 3;
  return data[offset] > 120 && data[offset + 1] < 100;
};

const rawEdges = [];
for (let left = 0; left < rawNodes.length; left += 1) {
  for (let right = left + 1; right < rawNodes.length; right += 1) {
    const start = rawNodes[left];
    const end = rawNodes[right];
    const horizontal = Math.abs(start.y - end.y) <= 3;
    const vertical = Math.abs(start.x - end.x) <= 3;
    if (!horizontal && !vertical) continue;

    const hasIntermediateNode = rawNodes.some((node, index) => {
      if (index === left || index === right) return false;
      if (horizontal) {
        return (
          Math.abs(node.y - start.y) <= 3 &&
          node.x > Math.min(start.x, end.x) + 3 &&
          node.x < Math.max(start.x, end.x) - 3
        );
      }
      return (
        Math.abs(node.x - start.x) <= 3 &&
        node.y > Math.min(start.y, end.y) + 3 &&
        node.y < Math.max(start.y, end.y) - 3
      );
    });
    if (hasIntermediateNode) continue;

    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y));
    let redSamples = 0;
    for (let step = 0; step <= steps; step += 1) {
      const x = start.x + ((end.x - start.x) * step) / steps;
      const y = start.y + ((end.y - start.y) * step) / steps;
      let hit = false;
      for (let offset = -2; offset <= 2; offset += 1) {
        if (isRed(horizontal ? x : x + offset, horizontal ? y + offset : y)) {
          hit = true;
        }
      }
      if (hit) redSamples += 1;
    }
    if (redSamples / (steps + 1) > 0.65) rawEdges.push([left, right]);
  }
}

// Align the graph output with the original 800 x 600 raster example.
const sourceBounds = { xMin: 246, xMax: 493, yMin: 111, yMax: 605 };
const targetBounds = { xMin: 276, xMax: 525, yMin: 52, yMax: 554 };
const mapPoint = ({ x, y }) => ({
  x: Number(
    (
      targetBounds.xMin +
      ((x - sourceBounds.xMin) / (sourceBounds.xMax - sourceBounds.xMin)) *
        (targetBounds.xMax - targetBounds.xMin)
    ).toFixed(2),
  ),
  y: Number(
    (
      targetBounds.yMin +
      ((y - sourceBounds.yMin) / (sourceBounds.yMax - sourceBounds.yMin)) *
        (targetBounds.yMax - targetBounds.yMin)
    ).toFixed(2),
  ),
});

const nodes = rawNodes.map((node, index) => ({ id: index, ...mapPoint(node) }));
const edges = rawEdges.map(([from, to], index) => ({
  id: index,
  from,
  to,
  x1: nodes[from].x,
  y1: nodes[from].y,
  x2: nodes[to].x,
  y2: nodes[to].y,
  length: Number(
    Math.hypot(nodes[to].x - nodes[from].x, nodes[to].y - nodes[from].y).toFixed(2),
  ),
}));

await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(
  output,
  `${JSON.stringify(
    {
      source: "Recovered from the notebook's rendered NetworkX output",
      viewBox: [0, 0, 800, 600],
      nodes,
      edges,
    },
    null,
    2,
  )}\n`,
);

console.log(`Extracted ${nodes.length} nodes and ${edges.length} edges to ${output}`);
