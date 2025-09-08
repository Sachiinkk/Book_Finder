import React, { useEffect } from 'react'
import { getCoverUrl } from '../utils/openLibrary.js'

export default function BookModal({ book, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!book) return null
  const img = getCoverUrl(book, 'L')

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Book details"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            {img ? (
              <img src={img} alt={book.title} className="max-h-[70vh] object-contain" />
            ) : (
              <div className="h-64 w-full flex items-center justify-center text-neutral-400">No cover</div>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{book.title}</h3>
              <button
                onClick={onClose}
                className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>
            <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              {(book.author_name || []).join(', ') || 'Unknown author'}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Info label="First publish year" value={book.first_publish_year || '—'} />
              <Info label="Edition count" value={book.edition_count || '—'} />
              <Info label="Language(s)" value={(book.language || []).join(', ') || '—'} />
              <Info label="Publish years" value={(book.publish_year || []).slice(0, 5).join(', ') || '—'} />
            </div>
            {Array.isArray(book.subject) && book.subject.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-medium mb-1">Subjects</div>
                <div className="flex flex-wrap gap-2">
                  {book.subject.slice(0, 12).map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded-full border border-neutral-300 dark:border-neutral-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 text-sm px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90"
            >
              View on Open Library
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-2">
      <div className="text-xs text-neutral-500 dark:text-neutral-400">{label}</div>
      <div className="mt-0.5 text-neutral-800 dark:text-neutral-100">{value}</div>
    </div>
  )
}
