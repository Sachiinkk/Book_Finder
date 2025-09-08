import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import BookGrid from './components/BookGrid.jsx'
import BookModal from './components/BookModal.jsx'
import Spinner from './components/Spinner.jsx'
import { buildSearchUrl } from './utils/openLibrary.js'
import { useFavorites } from './context/FavoritesContext.jsx'

const LIMIT = 20
const DEFAULT_QUERIES = ["harry potter", "clean code", "javascript", "design patterns", "tolkien"]

export default function App() {
  const [view, setView] = useState('search') // 'search' | 'favorites'
  const [query, setQuery] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const [yearFilter, setYearFilter] = useState('')
  const [results, setResults] = useState([])   // aggregated
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  const [defaultQuery, setDefaultQuery] = useState('') // store chosen default query

  const abortRef = useRef(null)
  const sentinelRef = useRef(null)

  const { favorites } = useFavorites()

  // Fetch default books once when app loads
  useEffect(() => {
    const chosen = DEFAULT_QUERIES[Math.floor(Math.random() * DEFAULT_QUERIES.length)]
    setDefaultQuery(chosen)
    fetchPage(1, chosen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Trigger fresh search on new query (except empty query → show defaults again)
  useEffect(() => {
    if (!query.trim()) {
      // Show default books again
      setResults([])
      setTotal(0)
      setHasMore(false)
      setPage(0)
      setError(null)
      if (defaultQuery) fetchPage(1, defaultQuery)
      return
    }
    // reset and fetch page 1
    setResults([])
    setTotal(0)
    setHasMore(false)
    setPage(0)
    setError(null)
    fetchPage(1, query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // Infinite scroll
  useEffect(() => {
    if (view !== 'search') return
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && hasMore && !loading) {
        fetchPage(page + 1, query.trim() || defaultQuery)
      }
    }, { rootMargin: '600px' })

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, loading, page, query, view, defaultQuery])

  function cancelOngoing() {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
  }

  async function fetchPage(nextPage, q) {
    try {
      cancelOngoing()
      setLoading(true)
      const ac = new AbortController()
      abortRef.current = ac
      const url = buildSearchUrl({ title: q, page: nextPage, limit: LIMIT })
      const res = await fetch(url, { signal: ac.signal })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const data = await res.json()

      const docs = Array.isArray(data.docs) ? data.docs : []
      setResults(prev => {
        const seen = new Set(prev.map(d => d.key))
        const merged = [...prev]
        for (const d of docs) {
          if (d.key && !seen.has(d.key)) {
            merged.push(d)
            seen.add(d.key)
          }
        }
        return merged
      })
      setTotal(data.numFound || 0)
      setPage(nextPage)
      const numFound = data.numFound || 0
      setHasMore(nextPage * LIMIT < numFound)
      setError(null)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    let out = results
    if (authorFilter.trim()) {
      const needle = authorFilter.trim().toLowerCase()
      out = out.filter(d => (d.author_name || []).some(a => a.toLowerCase().includes(needle)))
    }
    if (yearFilter.trim()) {
      const yr = parseInt(yearFilter.trim(), 10)
      if (!Number.isNaN(yr)) {
        out = out.filter(d => d.first_publish_year === yr)
      }
    }
    return out
  }, [results, authorFilter, yearFilter])

  const noResults = (query || defaultQuery) && !loading && filtered.length === 0 && !error

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header
        view={view}
        setView={setView}
        onSearch={setQuery}
        initialQuery={query}
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        total={total}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {view === 'search' && (
          <>
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 mt-6 dark:bg-red-950/30 dark:border-red-900 text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            <BookGrid
              books={filtered}
              onSelect={setSelected}
              emptyMessage={noResults ? "No results found. Try a different title, author, or year." : null}
            />

            {loading && <div className="mt-6 flex justify-center"><Spinner /></div>}

            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} className="h-1" />

            {/* Fallback Load More button */}
            {!loading && hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => fetchPage(page + 1, query.trim() || defaultQuery)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}

        {view === 'favorites' && (
          <>
            <h2 className="mt-6 mb-4 text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              Your Favorites ({Object.keys(favorites).length})
            </h2>
            <BookGrid
              books={Object.values(favorites)}
              onSelect={setSelected}
              emptyMessage="No favorites yet. Click the heart icon on any book to save it."
            />
          </>
        )}
      </main>

      <BookModal book={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
