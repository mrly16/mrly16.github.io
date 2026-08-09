---
locale: zh
slug: floor-plan-reconstruction
order: 5
title: 从栅格图片到可编辑户型数据
eyebrow: 空间智能 · 计算机视觉
summary: >-
  在实践中，设计师常常通过工程图纸用抽象的图形、符号、注释表达设计意图，但图像这个媒介难以进行数字化的管理、统计、计量和应用。该项目通过建立全流程的算法管线，结合计算机视觉与几何优化，将栅格户型图转换为可编辑、结构化的建筑数据结构，以支持产品与业务上的大规模应用。
role: 端到端算法负责人；带领 4 名工程师和 1 名实习生
period: 2022.03–2023.01
technologies:
  - 语义分割
  - 合成数据
  - 空间图
  - 计算几何
  - 约束优化
  - Python
metrics:
  - value: 7万
    label: 张户型图完成重建
  - value: 30秒
    label: 单张图片处理时间
  - value: 90%
    label: 无需人工修正
  - value: 200万元
    label: 支撑已付费客户系统
disclosure: 本案例仅使用脱敏架构与独立绘制的示意图，不包含公司源代码、专有数据格式或客户数据。
featured: true
diagram: /diagrams/floor-plan.svg
diagramAlt: 栅格户型图依次经过语义分割、多边形提取、空间图构建、约束优化，最终生成矢量结果的流程图。
framework: 计算机视觉
frameworkSummary: 只有把像素感知与几何、拓扑和产品约束结合，视觉结果才能成为可用数据。
sessionTitle: 户型图矢量重建
sessionHeadline: 从视觉到结构
sessionDescription: 通过构建全流程的算法工作流，将户型设计图从难以管理的图像数据转换为可编辑、结构化的建筑数据。
sessionVisual: /case-studies/floor-plan/source-to-segmentation.webp
sessionVideo: /case-studies/floor-plan/fp-hero-v3.mp4
sessionPoster: /case-studies/floor-plan/floorplan-hero-gradient-textured-poster.jpg
sessionMetric:
  value: 7万
  label: 张户型图完成重建
implementationStatus: 已投入生产
accent: terracotta
---

## 问题

小库的设计软件需要大量结构化户型数据，用于方案生成、评测、对比与推荐，但可获得的来源主要是房产网站上的栅格图片。

在系统建立之前，产品经理需要手工在软件中复刻户型，**每张约耗时 1 小时**。最终结果也不能只是视觉描边，而需要包含墙体矢量及宽度、门窗位置、房间名称与空间拓扑。

## 难点

- 公开且带完整语义标注的户型数据十分稀缺。
- 房产网站图片的风格、分辨率、装饰和噪声差异很大。
- 模型预测无法独立保证建筑几何的一致性。
- 输出必须可编辑，并兼容公司内部的数据格式。

## 我的职责

我负责算法方向与端到端交付，并带领 4 名工程师和 1 名实习生。我设计了合成数据方案，主导识别与重建管线，并推动评测结果进入产品和商业项目。

## 系统架构

### 1. 利用已有结构生成监督数据

公司已有矢量户型，但缺少带标注的栅格图片。我设计了前端渲染器，模拟房产网站的户型图风格，同时自动生成对应 mask，最终得到约 **3,000 张训练图片**，无需开展人工标注项目。

### 2. 用学习方法解决视觉不确定性

团队借鉴已发表的户型识别研究，训练语义分割模型。在真实房产网站图片测试集上，模型达到约 **85% IoU**。

<figure class="evidence-figure">
  <img src="/case-studies/floor-plan/source-to-segmentation.webp" alt="房产网站风格的户型图与对应语义分割结果。" />
  <figcaption>项目归档示例：房产网站风格的栅格输入，以及用于几何重建的语义区域。</figcaption>
</figure>

### 3. 用结构化方法完成重建

语义分割只是中间信号，而不是最终产品。系统继续提取多边形、构建空间图，并通过计算几何与约束优化恢复墙体、宽度、门窗、房间语义与空间拓扑。

<figure class="evidence-figure">
  <img src="/case-studies/floor-plan/annotated-plan.jpg" alt="标注了墙体、门窗、房间名称和尺寸的户型图。" />
  <figcaption>标注与几何质检视图：在一张代表性户型图上检查墙体、开口、房间名称与尺寸。</figcaption>
</figure>

### 4. 接入产品

最终工程管线可以把栅格图片直接转换为小库的可编辑矢量格式。结果能够被检查、在必要时修正，并供下游设计系统复用。

## 结果

系统累计自动重建约 **7 万张户型图**，单张耗时约 **30 秒**，其中约 **90%** 无需人工修正；**1 万张**重建结果成为产品中的可复用户型模板。

该能力也成为一套已付费 **约 200 万元**住宅户型研究系统的核心组成部分。

## 经验

> 正确划分系统边界，比强迫一个模型解决全部问题更重要。

机器学习负责视觉不确定性，几何与优化负责可编辑建筑数据所要求的结构一致性。相比单一的分割准确率，修正率、处理时间和产品采用量更能体现系统价值。
