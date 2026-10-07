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
    <div className="home-controls">
      <label className="search">
        <SearchIcon className="search__icon" />
        <input
          type="search"
          placeholder="Search posts…"
          value={query}
          onChange={(e) => update('q', e.target.value)}
          aria-label="Search posts"
        />
      </label>
      {allTags.length > 0 && (
        <button
          type="button"
          className={`filter-btn${filtersOpen ? ' is-open' : ''}`}
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          aria-controls="tag-bar"
        >
          <FilterIcon />
          Filters
          {tag && <span className="filter-btn__count">1</span>}
        </button>
      )}
    </div>
  )

  return (
    <>
      <PageHero title="Blog" subtitle={site.tagline} aside={controls} />

      {filtersOpen && allTags.length > 0 && (
        <div className="tag-bar" id="tag-bar">
          <div className="tag-bar__inner">
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

      <div className="container home">
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
