# Floor-plan reconstruction video kit

This folder contains source material and an initial editing brief for the
floor-plan reconstruction portfolio video.

## Recommended use

- `deliverables/floor-plan-spatial-graph-animatic-v1.mp4` is a timing sketch,
  not a finished visual treatment.
- `assets/source/01` through `04` belong to the same floor-plan example and may
  be animated as one continuous transformation.
- `assets/source/05` and `06` are supporting examples from different plans.
  Use them as separate evidence shots, not as later stages of the first plan.
- `assets/overlays` contains transparent contour and graph layers suitable for
  compositing in After Effects, DaVinci Resolve, Premiere, or web animation.

## Asset index

| Asset | Meaning | Recommended treatment |
| --- | --- | --- |
| `01-raster-plan.png` | Original furnished raster drawing | Slow crop or scan over noise, labels, walls, and furniture |
| `02-wall-contours.png` | Extracted wall and room boundaries | Trace-on reveal; avoid a simple dissolve |
| `03-spatial-graph.png` | Nodes and edges representing spatial structure | Animate edges from nodes, then snap nodes into alignment |
| `04-graph-on-plan.jpg` | Graph coordinates over the source plan | Overlay proof that the structure corresponds to the raster |
| `05-source-to-segmentation.webp` | Separate input and semantic-mask example | Use as a short supporting comparison |
| `06-semantic-output.jpg` | Separate reconstructed semantic example | Use as an end card or additional production-result example |

## Public claims supported by the wider case study

- 70,000 raster floor plans reconstructed in total.
- 10,000 reconstructed plans were used as templates in the product.
- Approximately 90% of outputs required no manual correction.
- Approximately 30 seconds processing time per image.
- The segmentation evaluation used real listing images.

Do not place the notebook's `mIoU > 0.90` note in the video until its evaluation
version is reconciled with the previously verified 85% figure.

## Visual principle

The spatial graph is the central reveal:

`Raster appearance -> geometric boundaries -> spatial relationships -> editable structure`

The result should feel precise and mechanical, not like an AI magic effect.
Avoid particles, glowing neural networks, code montages, and generic HUD
graphics.

