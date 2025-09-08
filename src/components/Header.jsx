import React from 'react'
import SearchBar from './SearchBar.jsx'
import FilterBar from './FilterBar.jsx'
import DarkModeToggle from './DarkModeToggle.jsx'

export default function Header({
  view, setView,
  onSearch, initialQuery,
  authorFilter, setAuthorFilter,
  yearFilter, setYearFilter,
  total
}) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                📚 Book Finder
              </span>
              {typeof total === 'number' && total > 0 && (
                <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  {total.toLocaleString()} results
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <nav className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-1">
                <button
                  onClick={() => setView('search')}
                  className={`px-3 py-1.5 rounded-lg text-sm ${view==='search' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                >
                  Search
                </button>
                <button
                  onClick={() => setView('favorites')}
                  className={`px-3 py-1.5 rounded-lg text-sm ${view==='favorites' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                >
                  Favorites
                </button>
              </nav>
              <DarkModeToggle />
            </div>
          </div>
          <SearchBar onSearch={onSearch} initialQuery={initialQuery} />
          <FilterBar
            author={authorFilter}
            setAuthor={setAuthorFilter}
            year={yearFilter}
            setYear={setYearFilter}
          />
        </div>
      </div>
    </header>
  )
}
