---
locale: en
slug: multimodal-asset-search
order: 4
title: Multimodal search across one million images
eyebrow: Cloud Architecture · Multimodal Retrieval
summary: A cloud-hosted asset platform replacing local-file workflows with text, image, tag, and caption search for internal modeling and product teams.
role: Sole architect and implementer
period: Current company
technologies:
  - CLIP
  - Vertex AI Vector Search
  - BigQuery
  - Cloud Run
  - Cloud Storage
  - GKE
  - Dataflow
metrics:
  - value: 1M
    label: images indexed
  - value: ~1 sec
    label: search response after warm-up
  - value: 100+ FPS
    label: CLIP embedding throughput
  - value: 4 modes
    label: text, image, tag, and caption search
disclosure: This is a multimodal vector-search system, not RAG. The case study omits company assets, credentials, implementation code, and undocumented orchestration details.
featured: true
diagram: /diagrams/multimodal-search.svg
diagramAlt: Diagram showing images processed by GPU batch jobs and a CLIP service into Cloud Storage, BigQuery, Vertex AI Vector Search, and a Cloud Run search interface.
accent: blue
---

## The problem

Modeling, testing, algorithm, and product teams needed to inspect and reuse a
rapidly growing image collection. Local file systems had become impossible to
navigate at the scale of approximately one million assets.

The platform needed to support more than filenames. Users had to find visually
similar assets, search from natural-language descriptions, and combine semantic
retrieval with tags and captions.

## My ownership

I personally designed and built the complete system: data processing, embedding
service, storage model, vector retrieval, search APIs, cloud deployment, and
user-facing application.

## Architecture

A self-hosted CLIP service generated embeddings at more than **100 images per
second**. Processed assets were written to Cloud Storage, while BigQuery held
metadata, tags, captions, and embeddings. Vertex AI Vector Search served
semantic similarity retrieval.

The user-facing search service ran on Cloud Run and supported:

- text-to-image semantic search,
- image-to-image similarity search,
- tag filtering and search,
- caption search.

After an approximately one-minute cold start, searches across the
one-million-image index returned in approximately **one second**.

## A rejected architecture

I initially evaluated Dataflow for offline image work such as thumbnail
generation, resizing, cropping, and embedding. It did not fit the requirement
to bring up elastic GPU workers for an on-demand batch and release them after
the work completed.

I therefore moved offline GPU processing to GKE, while keeping the user-facing
search path serverless on Cloud Run.

This split matched each workload to a more appropriate execution model:
longer-running, GPU-heavy batches on managed Kubernetes infrastructure and
bursty search traffic on an on-demand service.

## Results

The platform replaced fragmented local-file workflows with one shared search
surface used by testing, algorithm development, product, and other internal
teams. It provided multimodal discovery over **one million images** with
approximately **one-second** warm search latency.

## Important boundary

This system performs multimodal embedding and vector retrieval. It is **not a
RAG system** because retrieved assets are not presented here as grounding
context for a generative model.
