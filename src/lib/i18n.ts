export type Locale = "en" | "zh";

export const siteCopy = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      contact: "Contact"
    },
    language: "中文",
    localePath: "/zh/",
    home: "/",
    projects: "/projects/",
    about: "/about/",
    contact: "/contact/",
    footer: "Applied AI systems, built from first principles.",
    disclosure: "Disclosure"
  },
  zh: {
    nav: {
      work: "项目",
      about: "关于",
      contact: "联系"
    },
    language: "English",
    localePath: "/",
    home: "/zh/",
    projects: "/zh/projects/",
    about: "/zh/about/",
    contact: "/zh/contact/",
    footer: "从问题本质出发，构建可落地的 AI 系统。",
    disclosure: "公开说明"
  }
} as const;

export function localizedProjectPath(locale: Locale, slug: string) {
  return locale === "zh" ? `/zh/projects/${slug}/` : `/projects/${slug}/`;
}
