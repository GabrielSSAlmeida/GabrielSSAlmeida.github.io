import { githubUrl, site } from '../site.config'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Logo />
        <p className="footer__text">
          © {new Date().getFullYear()} {site.name} ·{' '}
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a> ·{' '}
          <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  )
}
