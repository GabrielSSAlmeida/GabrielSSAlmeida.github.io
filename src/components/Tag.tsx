import './Tag.css'

interface TagProps {
  children: string
  active?: boolean
  onClick?: () => void
  variant?: 'chip' | 'pill'
}

/** `chip` = filter button (Home), `pill` = small label on cards. */
export function Tag({ children, active = false, onClick, variant = 'pill' }: TagProps) {
  const className = `tag tag--${variant}${active ? ' is-active' : ''}`
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} aria-pressed={active}>
        {children}
      </button>
    )
  }
  return <span className={className}>{children}</span>
}
