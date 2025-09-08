import React from 'react'

export default function FilterBar({ author, setAuthor, year, setYear }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Filter by author (contains match)"
        className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
      />
      <input
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Filter by first publish year (e.g., 2008)"
        inputMode="numeric"
        className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
      />
    </div>
  )
}
