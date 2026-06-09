---
locale: en
slug: cad-recognition
order: 5
title: Turning CAD geometry into architectural structure
eyebrow: Computational Geometry · CAD Intelligence
summary: A geometry-first recognition pipeline that identified walls, doors, and windows in noisy CAD drawings and converted them into structured building elements.
role: Algorithm design and integration
period: XKool tenure
technologies:
  - CAD Parsing
  - Computational Geometry
  - Graph Algorithms
  - Spatial Reasoning
  - Python
  - NetworkX
metrics:
  - value: "3"
    label: architectural element classes
  - value: DWG
    label: native drawing input
  - value: Vector
    label: structured output
  - value: Hybrid
    label: rules and spatial graphs
disclosure: This case study is reconstructed from personal project notebooks and independently redrawn workflow diagrams. It does not publish employer code, original drawings, customer data, or proprietary schemas.
featured: true
diagram: /diagrams/cad-recognition.svg
diagramAlt: CAD geometry passing through normalization, wall, door and window recognition, topology validation, and structured export.
accent: sage
---

## The problem

Architectural CAD files look structured to a person, but their internal
geometry is often inconsistent. The same wall may be represented by parallel
lines, fragmented segments, nested blocks, or layers whose naming conventions
change between drawing sources.

The system needed to recover architectural meaning rather than merely render
the drawing: which segments formed walls, where openings interrupted them, and
how the resulting elements connected.

## Recognition strategy

### 1. Normalize drawing geometry

The pipeline flattened relevant blocks and layers into a common geometric
representation, reconciled scale and orientation, and merged nearby collinear
segments. This reduced source-specific CAD conventions to a smaller set of
spatial primitives.

### 2. Recognize wall structure

Wall recognition started from parallel line relationships, distance
thresholds, overlap, and connectivity. Candidate wall boundaries were grouped
and converted into a graph that preserved junctions and centerline structure.

### 3. Detect doors and windows

Doors and windows required different spatial cues. Door candidates combined
gaps in wall continuity with nearby swing or frame geometry. Window candidates
used repeated parallel-line patterns embedded in wall regions.

### 4. Validate the whole plan

Element recognition was not treated as a collection of isolated detections.
The final stage reconciled overlaps, snapped endpoints, and checked adjacency
so the exported walls and openings formed a usable architectural network.

## Why geometry came first

The input was already vector data, so rasterizing everything for an image model
would discard precision and make scale harder to preserve. Explicit geometry
also made failure cases inspectable: thresholds, candidate groups, and graph
connections could be visualized and corrected directly.

## Relationship to floor-plan reconstruction

This work and the raster floor-plan system approached the same product need
from opposite directions. CAD recognition extracted semantics from existing
vector primitives; floor-plan reconstruction inferred geometry from pixels.
Both ultimately converged on structured walls, openings, and topology.

## What I learned

> Architectural intelligence depends as much on relationships between elements
> as on recognizing the elements themselves.

Local rules were useful for producing candidates. A coherent spatial graph was
what turned those candidates into a plan that downstream systems could use.
