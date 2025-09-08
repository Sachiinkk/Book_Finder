import React, { useState } from 'react'

export default function SearchBar({ onSearch, initialQuery='' }) {
  const [value, setValue] = useState(initialQuery)

  function handleSubmit(e) {
    e.preventDefault()
    const v = value.trim()
    if (v.length === 0) return
    onSearch(v)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
      />
      <button
        type="submit"
        className="rounded-xl bg-neutral-900 text-white px-4 py-2 dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90"
      >
        Search
      </button>
    </form>
  )
}
