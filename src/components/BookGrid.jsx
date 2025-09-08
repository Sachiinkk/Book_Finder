import React from 'react'
import BookCard from './BookCard.jsx'

export default function BookGrid({ books, onSelect, emptyMessage }) {
  if (!books || books.length === 0) {
    return emptyMessage ? (
      <div className="mt-12 text-center text-neutral-600 dark:text-neutral-300">{emptyMessage}</div>
    ) : null
  }
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {books.map(b => (
        <BookCard key={b.key} book={b} onClick={() => onSelect(b)} />
      ))}
    </div>
  )
}
