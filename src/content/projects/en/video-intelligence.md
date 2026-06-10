---
locale: en
slug: robotic-video-intelligence
order: 2
title: A video-intelligence platform for robots and drones
eyebrow: Real-time AI · Systems Engineering
summary: A task-centric platform that turns camera streams and recorded video into live analysis, repeatable batch tests, event evidence, and customer demonstrations.
role: System architect and primary platform engineer
period: Apr. 2025–present
technologies:
  - Python
  - FastAPI
  - GStreamer
  - ZLMediaKit
  - PyTorch
  - OpenCV
  - BoxMOT
  - React
  - SQLite
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
diagramAlt: Diagram showing video sources entering live and batch task modes, a GPU inference and event layer, and an evidence workspace for replay and comparison.
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

## Product workflow

The platform organizes analysis around persistent tasks rather than isolated
model calls. Operators first register an RTMP camera or upload test video, then
reuse that source in three workflows:

- **stream to stream** for live device demonstrations,
- **file to stream** for replaying recorded footage as a live analysis session,
- **file to file** for repeatable batch regression tests.

The same task can then be inspected through a live event panel, task history,
media timeline, event gallery, or side-by-side comparison. This made a customer
demo and an algorithm debugging session different views of the same evidence,
not separate toolchains.

<figure class="evidence-figure">
  <img src="/case-studies/video-intelligence/operations-loop.svg" alt="A video source branching into live demonstration, batch testing, and evidence review workflows." />
  <figcaption>Sanitized product workflow reconstructed from the implemented task, media, replay, and comparison modules.</figcaption>
</figure>

## System architecture

### Media plane

GStreamer handles file, RTMP, paired RGB/infrared, and dual-stream input
pipelines. Result streams are published through a media service and converted
to browser-playable HTTP-FLV, while source recordings, result files, and event
snapshots are retained behind a server-side media proxy.

### GPU execution plane

The inference service preloads and warms models, assigns instances through a
pool, batches frames, and adjusts model-instance demand as tasks start and
finish. Queue depth, dropped frames, inference time, draw time, and push time
are monitored so bottlenecks can be located rather than inferred from a frozen
demo.

Bounded queues and backlog downsampling prevent slow inference from allowing
latency to grow without limit. Queue and drop behavior remains configurable for
specialized pipelines such as paired RGB/infrared processing.

### Event and evidence plane

Tracked detections feed configuration-driven temporal rules. The implemented
pipeline includes event deduplication, asynchronous snapshot persistence, and
motion-aware rules using optical-flow ego-motion compensation.

Every task stores lifecycle metadata and frame-level detections. Events remain
linked to media timestamps, enabling a reviewer to open an event, seek several
seconds before it, and replay nearby detections as overlays rather than relying
only on a final screenshot.

### Deployment plane

The offline package separates the web application, GPU analysis service, media
proxy/recorder, and live-stream gateway into Docker services. This allowed the
same system to run inside the company or on a customer-site workstation without
depending on public cloud connectivity.

## Key decisions

### Separate detector ownership from platform ownership

Algorithm engineers could add or update detectors while the platform retained
responsibility for sources, task lifecycle, streams, evidence, comparison, and
review.

### Preserve evidence, not just rendered output

Persisting source media, result media, event snapshots, timestamps, and
frame-level detections made failures reproducible and comparisons defensible.

### Bound latency instead of hiding backlog

A live or real-time-paced analysis session must remain close to the current
media timestamp. Bounded queues, controlled frame dropping, and explicit
metrics made overload visible while preventing an apparently running stream
from drifting progressively further behind.

## Results

The platform supported **eight concurrent 30 FPS streams on one RTX 4090**.
Documented internal measurements showed integration debugging dropping from
approximately **100 to 5 person-days**, customer testing from **80 to 2**, and
demonstration preparation from **100 to 2**.

For an external highway client, the team completed a live POC in a single
two-day visit using a controller-operated drone, rather than spending weeks on
hardware installation and environment tuning.

Internally, the same platform became a reusable environment for model
integration, regression testing, debugging, product review, and rapid video-AI
showcases with any camera-equipped device.

## Current boundary

The current implementation is deterministic and event-driven. Agentic
investigation, document retrieval, and VLM-based evidence synthesis are
promising future layers, but are intentionally not claimed as completed work.
