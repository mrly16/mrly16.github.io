---
locale: en
slug: lookx-generative-ai
order: 3
title: Making architectural generation usable
eyebrow: Generative AI · Product Engineering
summary: Task-specific generative workflows that hid model complexity and helped architecture professionals move from sketches and 3D models to renders.
role: Sole algorithm engineer on the product team
period: XKool tenure
technologies:
  - Stable Diffusion 1.5
  - ControlNet
  - PyTorch
  - ComfyUI
  - Computer Vision
  - Data Tooling
metrics:
  - value: 400K+
    label: registered users by Mar. 2025
  - value: 70%+
    label: product usage from Render Mode
  - value: 10K
    label: architectural training images
  - value: 20 sec
    label: approximate generation time
disclosure: Product architecture and outcomes are described without publishing training data, company code, model weights, or unverified commercial metrics. LookX is publicly available at lookx.ai.
featured: true
diagram: /diagrams/lookx.svg
diagramAlt: Diagram showing sketch, conceptual volume, and detailed 3D model inputs flowing through task-specific conditioning and diffusion pipelines to architectural renders.
accent: gold
---

## The user problem

Architectural professionals often relied on specialized 3D rendering workflows
that were expensive, slow, and difficult to iterate. Early generative tools
created a different problem: they exposed too many parameters and expected
users to learn how to experiment with the model.

The product challenge was to reduce that cognitive load without removing the
geometric control professionals needed.

## My ownership

As the product team's sole algorithm engineer, I owned model and feature
strategy, training, algorithm pipelines, data tooling, and algorithm-side
backend development. Backend engineers handled task processing, queueing, and
related services; other teammates owned user management, UI/UX, and broader
product design.

## Product architecture

I designed three task-specific workflows:

- **Sketch Mode** for exploratory generation from hand-drawn ideas.
- **Concept Mode** for visualizing screenshots of conceptual building volumes.
- **Render Mode** for higher-fidelity output from detailed 3D-model screenshots.

Instead of making users configure a general diffusion interface, each workflow
packaged the appropriate conditioning, model behavior, and defaults behind a
small number of meaningful actions.

## Model and data work

The system used Stable Diffusion 1.5 and a custom ControlNet trained with paired
3D-model screenshots and architectural renders. I built custom tools for
cleaning, captioning, and labeling an approximately **10,000-image** dataset,
and trained about five model iterations.

ComfyUI was part of the inference workflow, with results delivered in
approximately **20 seconds**.

## Key decision

> For professional users, a reliable task-shaped workflow was more valuable
> than a powerful interface with dozens of parameters.

We initially underestimated how strongly users preferred simplicity over the
ability to endlessly experiment. The product shifted toward clear modes that
matched recognizable stages of architectural work.

## Results

Render Mode accounted for more than **70% of total product usage**, indicating
that the constrained professional workflow became the primary use case. LookX
reached more than **400,000 registered users** by March 2025.

The lasting lesson was not simply how to train a domain diffusion model. It was
how model capability, geometric precision, latency, and interaction design had
to be packaged together to become a commercial tool.
