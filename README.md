# 📚 Book Finder (React + Vite + Tailwind)

A clean, fast book search app for Alex (User Need #1). Search by title using the Open Library Search API, filter by author/year (client-side), view details in a modal, save favorites to localStorage, enjoy dark mode, and infinite scrolling.

## ✨ Features
- Search by title via Open Library (`/search.json?title=`)
- Responsive grid with cover, title, author
- Loading / error / empty states
- Infinite scroll (with "Load more" fallback)
- Filter by author (contains) and first publish year (exact)
- Book details modal (subjects, first publish year, etc.)
- Favorites saved to `localStorage`
- Dark mode (persists, respects system preference)

## 🧱 Tech
- React + Vite
- Tailwind CSS
- Built-in React state + Context (no extra state libraries)
- No auth, public API only

## 🔧 Setup
```bash
npm install
npm run dev
```

## 🔗 Open Library
We use: `https://openlibrary.org/search.json?title={TITLE}&page={PAGE}&limit=20`

## 🚀 Build & Deploy (Vercel)
1. **Build** locally:
   ```bash
   npm run build
   ```
   This outputs a `dist/` folder.

2. **Push to GitHub** (recommended): create a repo and push this project.

3. **Deploy on Vercel:**
   - Import the GitHub repo in Vercel.
   - Framework preset: **Vite** (or just "Other").
   - Build command: `npm run build`
   - Output directory: `dist`
   - Click **Deploy**.

   _Alternatively_, you can drop the folder into Vercel CLI:
   ```bash
   npm i -g vercel
   vercel
   ```

4. **(Optional) CodeSandbox/StackBlitz:**
   - You can import the GitHub repo into CodeSandbox/StackBlitz to satisfy the "working app link" requirement.

## 📝 Submission Checklist
- **Level 1 (Working with AI):** include a link to this ChatGPT conversation in your submission.
- **Level 2 (Working application):** include the Vercel deployment URL.
- **Level 3 (Code sharing):** include your GitHub repo link + this README.

## 🗂 Project Structure
```text
book-finder/
  ├─ index.html
  ├─ package.json
  ├─ postcss.config.js
  ├─ tailwind.config.js
  ├─ vite.config.js
  ├─ src/
  │  ├─ main.jsx
  │  ├─ App.jsx
  │  ├─ index.css
  │  ├─ components/
  │  │  ├─ Header.jsx
  │  │  ├─ SearchBar.jsx
  │  │  ├─ FilterBar.jsx
  │  │  ├─ BookGrid.jsx
  │  │  ├─ BookCard.jsx
  │  │  ├─ BookModal.jsx
  │  │  └─ Spinner.jsx
  │  ├─ context/
  │  │  └─ FavoritesContext.jsx
  │  ├─ hooks/
  │  │  └─ useDarkMode.js
  │  └─ utils/
  │     └─ openLibrary.js
```

## 🧪 Notes
- Filters are client-side so results remain snappy while we page in more data.
- We de-duplicate by `doc.key` when aggregating pages.
- Modal shows fields commonly present in search results; if missing, UI displays a placeholder.

---

Made with ❤️ for the take-home challenge.
