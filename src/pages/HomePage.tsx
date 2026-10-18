import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { EmptyState } from '../components/EmptyState'
import { FilterIcon, SearchIcon } from '../components/Icons'
import { PageHero } from '../components/PageHero'
import { PostCard } from '../components/PostCard'
import { Tag } from '../components/Tag'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { allTags, posts, type Post } from '../lib/content'
import { site } from '../site.config'
import './HomePage.css'

function matches(post: Post, query: string, tag: string | null): boolean {
  if (tag && !post.tags.includes(tag)) return false
  if (!query) return true
  const haystack = [post.title, post.description, ...post.tags].join(' ').toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word))
}

export function HomePage() {
  useDocumentTitle()
  // Filters live in the URL (?q=...&tag=...) so filtered views are shareable.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const tag = params.get('tag')
  // Start open when arriving with a tag already selected (e.g. from a post's tag link).
  const [filtersOpen, setFiltersOpen] = useState(Boolean(tag))

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => posts.filter((p) => matches(p, query.trim(), tag)), [query, tag])

  const controls = (
    <div className="d-flex home-controls">
      <label className="search position-relative d-block flex-grow-1">
        <SearchIcon className="search__icon position-absolute top-50 translate-middle-y text-body-tertiary" />
        <input
          type="search"
          className="form-control"
          placeholder="Search posts…"
          value={query}
          onChange={(e) => update('q', e.target.value)}
          aria-label="Search posts"
        />
      </label>
      {allTags.length > 0 && (
        <button
          type="button"
          className={`filter-btn btn btn-toggle d-inline-flex align-items-center gap-2 flex-shrink-0 font-monospace${filtersOpen ? ' active' : ''}`}
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          aria-controls="tag-bar"
        >
          <FilterIcon />
          Filters
          {tag && <span className="filter-btn__count badge d-grid position-static rounded-pill bg-primary fw-bold">1</span>}
        </button>
      )}
    </div>
  )

  return (
    <>
      <PageHero title="Blog" subtitle={site.tagline} aside={controls} />

      {filtersOpen && allTags.length > 0 && (
        <div className="border-bottom border-soft" id="tag-bar">
          <div className="tag-bar__inner d-flex flex-wrap gap-2 mx-auto">
            <Tag variant="chip" active={!tag} onClick={() => update('tag', null)}>
              ALL
            </Tag>
            {allTags.map((t) => (
              <Tag key={t} variant="chip" active={tag === t} onClick={() => update('tag', tag === t ? null : t)}>
                {t}
              </Tag>
            ))}
          </div>
        </div>
      )}

      <div className="page mx-auto pt-5 d-flex flex-column home">
        {posts.length === 0 ? (
          <EmptyState>No posts yet. Stay tuned!</EmptyState>
        ) : filtered.length === 0 ? (
          <EmptyState>No posts match your search.</EmptyState>
        ) : (
          filtered.map((p) => <PostCard key={p.slug} post={p} />)
        )}
      </div>
    </>
  )
}
