import { useEffect, useState } from 'react'

const KEY = 'bookFinder:theme'

export default function useDarkMode() {
  const getInitial = () => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'dark' || saved === 'light') return saved
      // fallback system
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    } catch {}
    return 'light'
  }

  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem(KEY, theme) } catch {}
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return [theme, toggle]
}
