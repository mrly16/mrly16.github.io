---
locale: en
slug: robotic-video-intelligence
order: 2
title: A video-intelligence platform for robots and drones
eyebrow: Real-time AI · Systems Engineering
summary: An extensible platform connecting camera-equipped devices to pluggable detection, temporal logic, review, and customer demonstration workflows.
role: System architect and primary platform engineer
period: Apr. 2025–present
technologies:
  - Python
  - FastAPI
  - GStreamer
  - PyTorch
  - OpenCV
  - BoxMOT
  - React
  - Docker
metrics:
  - value: 8 × 30 FPS
    label: concurrent streams on one RTX 4090
  - value: 100→5
    label: person-days for integration debugging
  - value: 80→2
    label: person-days for customer testing
  - value: 2 days
    label: on-site customer POC
disclosure: The architecture and measured process improvements are sanitized. The external highway client remains anonymous. This platform is not presented as an implemented LLM or VLM agent.
featured: true
diagram: /diagrams/video-platform.svg
diagramAlt: Diagram showing cameras and robots feeding a streaming layer, GPU inference pool, tracking and event logic, persistence, and an operations interface.
accent: sage
---

## The operational problem

Every customer POC had become a full deployment exercise. Hardware, drone
docks, operators, and engineering teams were sent to a site before the
algorithm team could meaningfully iterate. Environment tuning and fragmented
feedback then continued for weeks.

The missing capability was not another detector. It was a shared system that
connected devices, algorithms, operators, product teams, management, and
customer evidence.

## My ownership

I built the platform across backend, frontend, streaming infrastructure,
RGB/infrared support, event framework, persistence, operational tooling, and
deployment. Individual detection models and scenario-specific business
algorithms were owned by the algorithm team.

## Architecture

The input layer accepts files, RTMP streams, and paired RGB/infrared sources.
GStreamer handles media ingestion and output. A GPU service manages model
loading, warm-up, instance pooling, batching, and backpressure.

Downstream stages provide multi-object tracking, optical-flow ego-motion
compensation, RGB/infrared alignment and verification, and
configuration-driven temporal event rules. Tasks, event snapshots, and result
media are persisted and surfaced through a live operations interface.

The full GPU service is Dockerized for internal and offline customer-site
deployment.

## Technical decisions

### Separate model capability from operational workflow

Algorithm teams could plug in detectors while the platform handled streams,
task state, event evidence, comparison, and review. This made model improvement
far easier without repeatedly rebuilding customer infrastructure.

### Make system behavior observable

Persistent tasks, logs, event media, and live results created a shared source of
truth for engineering, product, and customer conversations.

### Design for real device constraints

Backpressure, model pooling, batching, and warm-up were required to keep
multiple live streams stable on limited hardware.

## Results

The platform supported **eight concurrent 30 FPS streams on one RTX 4090**.
Documented internal measurements showed integration debugging dropping from
approximately **100 to 5 person-days**, customer testing from **80 to 2**, and
demonstration preparation from **100 to 2**.

For an external highway client, the team completed a live POC in a single
two-day visit using a controller-operated drone, rather than spending weeks on
hardware installation and environment tuning.

## What comes next

The current implementation is deterministic and event-driven. Agentic
investigation, document retrieval, and VLM-based evidence synthesis are
promising future layers, but are intentionally not claimed as completed work.
