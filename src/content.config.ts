import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
    generateId: ({ data, entry }) =>
      `${String(data.locale ?? entry.split("/")[0])}/${String(data.slug ?? entry)}`
  }),
  schema: z.object({
    locale: z.enum(["en", "zh"]),
    slug: z.string(),
    order: z.number(),
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    role: z.string(),
    period: z.string(),
    technologies: z.array(z.string()),
    metrics: z.array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    ),
    disclosure: z.string(),
    featured: z.boolean().default(true),
    diagram: z.string(),
    diagramAlt: z.string(),
    accent: z.enum(["terracotta", "sage", "blue", "gold"])
  })
});

export const collections = { projects };
