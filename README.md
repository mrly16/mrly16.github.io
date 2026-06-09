# Liangyi Murong Portfolio

Bilingual Astro portfolio for [mrly16.github.io](https://mrly16.github.io).

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run build
```

The build runs Astro type checking before generating the static site.

## Content boundaries

- Employer projects use sanitized architecture and independently created diagrams.
- No employer source code, customer data, credentials, or proprietary formats are published.
- The multimodal search platform is described as vector retrieval, not RAG.
- The video-intelligence platform is not described as an implemented LLM/VLM agent.

## Deployment

Pushes to `main` build and deploy through GitHub Actions. In the repository
settings, configure Pages to use **GitHub Actions** as its source.
