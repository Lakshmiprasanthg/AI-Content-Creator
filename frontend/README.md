# AI Content Creator Frontend

React + Vite + TypeScript + Tailwind application consuming the backend API to authenticate users, generate AI content, and manage history.

## Tech Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- React Router DOM
- Axios (with interceptor)
- React Markdown

## Setup
Create `.env` from example:
```
VITE_API_BASE_URL=http://localhost:5000/api
```
Install dependencies:
```powershell
npm install
```
Run dev server:
```powershell
npm run dev
```
Visit: http://localhost:5173

## Structure (current phase)
```
src/
  api/axiosClient.ts      # Axios instance with auth header injection
  context/AuthContext.tsx # Global auth state (token + user)
  globals.css             # Tailwind + prose styles
  App.tsx                 # Root component
  main.tsx                # Entry point
```

Upcoming additions:
- router.tsx & protected routes
- Pages: Login, Register, Dashboard, History
- Components: Navbar, PromptForm, GeneratedContent, CategorySelector
- Hooks: useGenerateContent

## Auth Flow
1. User logs in/registers => store token in localStorage.
2. Axios interceptor adds `Authorization: Bearer <token>` header.
3. Protected routes check `isAuthenticated` from context.
4. Logout clears token & user.

## Styling
Tailwind utility classes + `react-markdown` with basic `prose` formatting.

## Future Enhancements
- Dark mode toggle
- Persistent user profile fetch (/api/auth/me)
- Toast notifications
- Better error boundary / fallback UI

---
Frontend scaffold ready; implement routing & pages next.
