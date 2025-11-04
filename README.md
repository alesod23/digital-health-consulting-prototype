# Paneo Health (Vite + React + TypeScript + Tailwind)

## Local dev
1) Install Node.js (>=18). On macOS: `brew install node`; on Windows: install from nodejs.org.
2) In a terminal, go to this folder and run:
   ```bash
   npm install
   npm run dev
   ```
3) Open the local URL shown (e.g. http://localhost:5173).

## Build for production
```bash
npm run build
npm run preview
```

## Deploy
- Commit this folder to GitHub (create a new repo and push).
- Connect your repo on your hosting (e.g., Vercel/Orchids).
- Set **Framework** = Vite, **Build command** = `npm run build`, **Output directory** = `dist`.
