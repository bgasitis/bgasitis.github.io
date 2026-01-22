# Integration TODO List

## Step 1: Create React App Directory Structure
- [x] Create `src/react-app/` directory
- [x] Create `src/react-app/components/` directory
- [x] Create `src/react-app/services/` directory
- [x] Create `src/react-app/types.ts` (copy from original)
- [x] Create `src/react-app/constants.ts` (copy from original)
- [x] Create `src/react-app/index.tsx` (entry point)

## Step 2: Copy React App Files
- [x] Copy components (VerseView, IndexPicker, AdminPanel, ChatBot)
- [x] Copy services (geminiService)
- [x] Copy App.tsx
- [x] Copy manifest.json
- [x] Copy sw.js

## Step 3: Install React Dependencies
- [x] Add @vitejs/plugin-react to devDependencies
- [x] Add react, react-dom to dependencies
- [x] Add @google/genai to dependencies

## Step 4: Update Vite Config
- [x] Add @vitejs/plugin-react plugin
- [x] Configure for hybrid Lit + React
- [x] Set base path for GitHub Pages
- [x] Configure service worker

## Step 5: Update index.html
- [x] Add React root div
- [x] Add Tailwind CSS CDN
- [x] Add fonts (Crimson Pro, Inter)
- [x] Add importmap for React
- [x] Keep existing PWA tags

## Step 6: Update manifest.json
- [x] Update app name to "Bhagavad Gita As It Is (Nepali)"
- [x] Update theme colors
- [x] Update icons
- [x] Keep PWA features

## Step 7: Update package.json
- [x] Add build script for React app
- [x] Configure TypeScript

## Step 8: Build & Deploy
- [x] Build successful
- [ ] Deploy to GitHub Pages

---

## Progress Log
- [x] All steps completed except deployment

