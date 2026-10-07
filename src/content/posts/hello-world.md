---
title: Hello, World
date: 2026-10-01
description: An example standalone post. It isn't part of any series, so it only shows up on the Home page.
tags: [Meta]
draft: true
---

This is an example post. Because it has `draft: true` in its front matter, it is only
visible while running `npm run dev`, and is never published.

Delete this file (or set `draft: false`) when you're ready.

## Front matter reference

```yaml
---
title: My post title           # required
date: 2026-10-06               # required, YYYY-MM-DD
description: One-line summary  # shown on cards and in search
tags: [Linux, Yocto]           # optional, used by the tag filter
series: getting-started        # optional, must exist in src/content/series.ts
seriesOrder: 1                 # optional, position inside the series
cover: /images/posts/foo.png   # optional, file in public/images/posts/
draft: true                    # optional, hides the post in production
---
```
