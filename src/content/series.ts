// A series groups posts. To add one, append an entry below, then set
// `series: <slug>` (and optionally `seriesOrder: <n>`) in each post's front matter.

export interface SeriesDefinition {
  /** Used in the URL (/series/<slug>) and referenced by posts. */
  slug: string
  title: string
  description: string
  /** Optional banner image, e.g. '/images/series/my-series.png' (files go in public/images/series). */
  cover?: string
}

export const seriesDefinitions: SeriesDefinition[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'An example series. Edit or remove it in src/content/series.ts.',
  },
]
