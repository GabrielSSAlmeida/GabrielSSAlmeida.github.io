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
    <header className="header">
      <div className="header__inner">
        <Logo />
        <nav className="header__nav" aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `header__link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <a className="icon-btn" href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="icon-btn" href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <span className="header__divider" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
