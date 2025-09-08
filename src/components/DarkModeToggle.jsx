import React from 'react'
import useDarkMode from '../hooks/useDarkMode.js'

export default function DarkModeToggle() {
  const [theme, toggle] = useDarkMode()
  return (
    <button
      onClick={toggle}
      className="rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
      title="Toggle dark mode"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
