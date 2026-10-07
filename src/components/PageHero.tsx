import type { ReactNode } from 'react'
import './PageHero.css'

interface PageHeroProps {
  title: ReactNode
  subtitle?: ReactNode
  /** Rendered beside the title, aligned right (e.g. the search box). */
  aside?: ReactNode
  children?: ReactNode
}

/** Page header: title + subtitle, with an optional right-aligned slot. */
export function PageHero({ title, subtitle, aside, children }: PageHeroProps) {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <span className="hero__dash" />
          <h1 className="hero__title">{title}</h1>
          {subtitle && <p className="hero__subtitle">{subtitle}</p>}
          {children}
        </div>
        {aside && <div className="hero__aside">{aside}</div>}
      </div>
    </section>
  )
}
