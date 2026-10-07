import { Link } from 'react-router'
import './Logo.css'

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Gabriel Almeida, home">
      <span className="logo__accent">GABRIEL</span>
      <span className="logo__sep">_</span>
      ALMEIDA
    </Link>
  )
}
