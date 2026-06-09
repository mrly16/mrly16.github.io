---
locale: zh
slug: multimodal-asset-search
order: 4
title: 百万级图片多模态检索
eyebrow: 云架构 · 多模态检索
summary: 用文本、图片、标签与 caption 检索替代本地文件管理，为内部建模、测试、算法和产品团队提供统一资产平台。
role: 独立完成系统架构与全部实现
period: 当前公司
technologies:
  - CLIP
  - Vertex AI Vector Search
  - BigQuery
  - Cloud Run
  - Cloud Storage
  - GKE
  - Dataflow
metrics:
  - value: 100万
    label: 张图片完成索引
  - value: 约1秒
    label: 预热后搜索响应
  - value: 100+ FPS
    label: CLIP embedding 吞吐
  - value: 4种
    label: 文本、图片、标签和 caption 检索
disclosure: 这是多模态向量检索系统，不是 RAG。案例不包含公司资产、凭据、实现代码或尚未记录的编排细节。
featured: true
diagram: /diagrams/multimodal-search.svg
diagramAlt: 图片通过 GPU 批任务与 CLIP 服务进入 Cloud Storage、BigQuery、Vertex AI Vector Search 和 Cloud Run 搜索界面的架构图。
accent: blue
---

## 问题

建模、测试、算法和产品团队需要检查并复用快速增长的图片资产。当规模达到约 100 万张时，本地文件系统已经无法有效管理。

平台需要提供的不只是文件名搜索。用户需要查找视觉相似资产、通过自然语言描述检索图片，并将语义搜索与标签、caption 结合。

## 我的职责

我独立设计并构建了完整系统，包括数据处理、embedding 服务、存储模型、向量检索、搜索 API、云端部署和用户界面。

## 系统架构

自托管 CLIP 服务以超过 **每秒 100 张图片**的速度生成 embedding。处理后的资产写入 Cloud Storage；BigQuery 保存元数据、标签、caption 和 embedding；Vertex AI Vector Search 提供语义相似度检索。

Cloud Run 承载用户侧搜索服务，支持：

- 文本搜索图片，
- 图片搜索相似图片，
- 标签过滤与搜索，
- caption 搜索。

服务冷启动约 1 分钟；预热后，在 100 万图片索引中的搜索约 **1 秒**返回。

## 被否决的架构

我最初尝试使用 Dataflow 处理缩略图生成、缩放、裁剪和 embedding 等离线图片任务，但它无法很好满足“按需拉起弹性 GPU 工作者，并在批任务完成后释放”的要求。

因此，我把离线 GPU 处理迁移到 GKE，同时保留 Cloud Run 作为面向用户的无服务器搜索服务。

这种拆分让执行模型与负载特征匹配：持续时间更长、GPU 密集的批任务运行在托管 Kubernetes 基础设施上；突发搜索流量则由按需服务处理。

## 结果

平台用一个共享检索界面替代了分散的本地文件工作流，被测试、算法开发、产品等多个内部团队使用。系统为 **100 万张图片**提供多模态发现能力，预热后搜索延迟约 **1 秒**。

## 重要边界

该系统实现的是多模态 embedding 与向量检索。这里不会称它为 **RAG**，因为检索结果并未作为生成模型的上下文来描述。
