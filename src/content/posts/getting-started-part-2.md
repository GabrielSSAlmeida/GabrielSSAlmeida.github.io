---
title: "Getting Started, Part 2: Series and Markdown Features"
date: 2026-10-06
description: Linking posts into a series, plus a tour of what the Markdown renderer supports (code, tables, images).
tags: [Meta, Markdown, C]
series: getting-started
seriesOrder: 2
draft: true
---

## Adding a post to a series

First declare the series once in `src/content/series.ts`:

```ts
{
  slug: 'yocto-from-scratch',
  title: 'Yocto from Scratch',
  description: 'Building an embedded Linux image step by step.',
  cover: '/images/series/yocto.png', // optional
}
```

Then reference it in each post's front matter:

```yaml
series: yocto-from-scratch
seriesOrder: 3
```

If you mistype the slug, the dev server shows an error telling you which file is wrong.

## Code

Fenced code blocks get syntax highlighting:

```c
#include <stdio.h>

int main(void) {
    for (int i = 0; i < 3; i++) {
        printf("blink %d\n", i);
    }
    return 0;
}
```

```bash
bitbake core-image-minimal
```

Inline code works too: `volatile uint32_t *reg`.

## Tables

| Board      | SoC        | RAM   |
| ---------- | ---------- | ----- |
| Board A    | i.MX 8M    | 2 GB  |
| Board B    | STM32MP1   | 512 MB|

## Images

Put images in `public/images/posts/` and reference them with an absolute path:

```md
![Alt text](/images/posts/my-diagram.png)
```

## Lists and quotes

- [x] Task lists
- [ ] ~~Strikethrough~~

> Block quotes look like this.
