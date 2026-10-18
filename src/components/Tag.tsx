import './Tag.css'

interface TagProps {
  children: string
  active?: boolean
  onClick?: () => void
  variant?: 'chip' | 'pill'
}

/** `chip` = filter button (Home), `pill` = small label on cards. */
export function Tag({ children, active = false, onClick, variant = 'pill' }: TagProps) {
  const className =
    variant === 'chip'
      ? `tag-chip btn btn-toggle d-inline-flex align-items-center rounded-1 font-monospace fw-medium${active ? ' active' : ''}`
      : 'badge d-inline-flex lh-base align-items-center border border-primary-subtle bg-primary-subtle text-primary-emphasis rounded-1 font-monospace'
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} aria-pressed={active}>
        {children}
      </button>
    )
  }
  return <span className={className}>{children}</span>
}
