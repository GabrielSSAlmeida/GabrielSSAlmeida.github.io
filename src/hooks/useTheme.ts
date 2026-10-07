import { useCallback, useState } from 'react'

export type Theme = 'dark' | 'light'

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/** The initial theme is applied by the inline script in index.html; this hook just reads and toggles it. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage unavailable (private mode): the choice just won't persist
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
