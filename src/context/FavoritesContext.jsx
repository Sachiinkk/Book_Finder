import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const Ctx = createContext(null)
const STORAGE_KEY = 'bookFinder:favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFavorites(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {}
  }, [favorites])

  const api = useMemo(() => ({
    favorites,
    isFavorite: (id) => !!favorites[id],
    addFavorite: (doc) => setFavorites(prev => ({ ...prev, [doc.key]: doc })),
    removeFavorite: (id) => setFavorites(prev => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    }),
    clearFavorites: () => setFavorites({}),
  }), [favorites])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useFavorites() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
