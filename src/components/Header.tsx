import { NavLink } from 'react-router'
import { githubUrl, site } from '../site.config'
import { GithubIcon, LinkedinIcon } from './Icons'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import './Header.css'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/series', label: 'Series', end: false },
  { to: '/about', label: 'About', end: false },
]

export function Header() {
  return (
    <header className="header sticky-top border-bottom border-soft">
      <div className="header__inner d-grid align-items-center mx-auto">
        <Logo />
        <nav className="header__nav d-flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `header__link position-relative fw-medium text-decoration-none${isActive ? ' is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="d-flex align-items-center justify-content-end gap-1">
          <a className="btn btn-icon d-inline-grid" href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="btn btn-icon d-inline-grid" href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <span className="header__divider" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
