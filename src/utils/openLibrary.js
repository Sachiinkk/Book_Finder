export function buildSearchUrl({ title, page=1, limit=20 }) {
  const url = new URL('https://openlibrary.org/search.json')
  if (title) url.searchParams.set('title', title)
  url.searchParams.set('page', String(page))
  url.searchParams.set('limit', String(limit))
  // You could add more params here if desired (e.g., language, author), but we filter client-side for simplicity.
  return url.toString()
}

export function getCoverUrl(doc, size='M') {
  // Prefer cover_i (Open Library cover id), fallback to first ISBN if present
  if (doc && doc.cover_i) {
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-${size}.jpg`
  }
  if (doc && Array.isArray(doc.isbn) && doc.isbn.length > 0) {
    return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-${size}.jpg`
  }
  return null
}
