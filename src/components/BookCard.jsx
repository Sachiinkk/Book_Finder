import React from 'react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { getCoverUrl } from '../utils/openLibrary.js'

export default function BookCard({ book, onClick }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(book.key)

  function toggleFavorite(e) {
    e.stopPropagation()
    if (favorite) removeFavorite(book.key)
    else addFavorite(book)
  }

  const authors = (book.author_name || []).join(', ')
  const img = getCoverUrl(book, 'M')

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 overflow-hidden hover:shadow-sm"
    >
      <div className="relative aspect-[3/4] bg-neutral-100 dark:bg-neutral-700">
        {img ? (
          <img
            src={img}
            alt={book.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-neutral-400 text-sm">No cover</div>
        )}
        <button
          onClick={toggleFavorite}
          title={favorite ? 'Remove from favorites' : 'Save to favorites'}
          className={`absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-medium ${favorite ? 'bg-pink-600 text-white' : 'bg-white/90 dark:bg-neutral-900/80 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700'} hover:opacity-90`}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="p-3">
        <div className="line-clamp-2 font-medium text-neutral-900 dark:text-neutral-100">{book.title}</div>
        <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">{authors || 'Unknown author'}</div>
        {book.first_publish_year && (
          <div className="mt-1 text-xs text-neutral-400">First published: {book.first_publish_year}</div>
        )}
      </div>
    </div>
  )
}
