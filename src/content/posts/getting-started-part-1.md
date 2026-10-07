---
title: "Getting Started, Part 1: Writing a Post"
date: 2026-10-04
description: How posts work on this blog. One Markdown file per post, with a bit of YAML on top.
tags: [Meta, Markdown]
series: getting-started
seriesOrder: 1
draft: true
---

Every post is a single Markdown file in `src/content/posts/`. The **file name becomes the URL**:
`src/content/posts/my-first-post.md` is served at `/posts/my-first-post`.

## Steps

1. Create `src/content/posts/<slug>.md`.
2. Add the front matter (title, date, description, tags).
3. Write the content in Markdown.
4. Run `npm run dev` to preview, then `npm run deploy` to publish.

> Tip: keep the file name short, lowercase and with dashes. It is the permanent link to the post.

The next part shows how to group posts into a series.
