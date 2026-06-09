---
locale: en
slug: floor-plan-reconstruction
order: 1
title: From raster images to editable floor plans
eyebrow: Spatial AI · Computer Vision
summary: A hybrid perception and geometry system that transformed unstructured listing images into editable architectural data at production scale.
role: End-to-end algorithm lead; led four engineers and one intern
period: XKool tenure
technologies:
  - Semantic Segmentation
  - Synthetic Data
  - Spatial Graphs
  - Computational Geometry
  - Constrained Optimization
  - Python
metrics:
  - value: 70K
    label: layouts reconstructed
  - value: 30 sec
    label: processing time per image
  - value: 90%
    label: required no manual correction
  - value: RMB 2M
    label: paid client system supported
disclosure: This case study uses sanitized architecture and independently created diagrams. No employer source code, proprietary format, or customer data is included.
featured: true
diagram: /diagrams/floor-plan.svg
diagramAlt: Diagram showing a raster floor plan passing through segmentation, polygon extraction, spatial graph construction, constrained optimization, and vector output.
accent: terracotta
---

## The problem

XKool's design software needed a large supply of structured floor plans for
generation, evaluation, comparison, and recommendation. The available source
material was mostly raster images from property listings.

Before this system, a product manager manually recreated each layout inside the
product. One layout took approximately **one hour**, and the result needed to
contain much more than a visual trace: wall vectors and widths, window
positions, room names, and spatial topology.

## Why it was difficult

- Public, semantically labeled floor-plan data was scarce.
- Listing images varied in style, resolution, decoration, and noise.
- Model predictions alone could not guarantee coherent architectural geometry.
- Output had to be editable and compatible with a proprietary downstream data
  model.

## My ownership

I owned the algorithmic direction and end-to-end delivery, leading four
engineers and one intern. I designed the synthetic-data strategy, guided the
recognition and reconstruction pipeline, and connected evaluation to product
integration and commercial use.

## Architecture

### 1. Generate supervision from existing structure

We already had vector layouts but not enough labeled raster images. I designed
a renderer that reproduced the visual styles of real-estate listings while
automatically generating corresponding masks. This produced approximately
**3,000 labeled training images** without a manual annotation campaign.

### 2. Use learning for perception

We adapted ideas from published floor-plan recognition work and trained a
semantic-segmentation model. On a test set of real property-listing images, the
model achieved approximately **85% IoU**.

<figure class="evidence-figure">
  <img src="/case-studies/floor-plan/source-to-segmentation.webp" alt="A property-listing floor plan beside its semantic segmentation result." />
  <figcaption>Archived pipeline example: listing-style raster input and the semantic regions used for geometric reconstruction.</figcaption>
</figure>

### 3. Use structure for reconstruction

Segmentation was an intermediate signal, not the product output. The system
extracted polygons, constructed a spatial graph, and applied computational
geometry and constrained optimization to recover coherent walls, widths,
windows, room labels, and topology.

<figure class="evidence-figure">
  <img src="/case-studies/floor-plan/annotated-plan.jpg" alt="A floor plan annotated with recognized wall, door, and window geometry." />
  <figcaption>Annotation and geometry QA view showing walls, openings, room labels, and dimensions on one representative plan.</figcaption>
</figure>

### 4. Integrate with the product

The final engineering pipeline converted a raster input directly into XKool's
editable vector format. Results could be reviewed, corrected when necessary,
and reused by downstream design systems.

## Results

The system automatically reconstructed approximately **70,000 floor plans** in
about **30 seconds per image**. Approximately **90%** required no manual
correction, and **10,000** became reusable templates inside the product.

The same capability became a core part of a paid **RMB 2 million** residential
layout research system.

## What I learned

> The right system boundary mattered more than forcing one model to solve the
> entire problem.

Machine learning handled visual uncertainty. Geometry and optimization enforced
the structure required by an editable architectural representation. Product
metrics such as correction rate, conversion time, and template adoption were
more meaningful than segmentation accuracy alone.
