# GitHub Pages Deployment Plan

## Current Project Status
- ✅ Project Type: Vite + React PWA
- ✅ Repository: bgasitis/bgasitis.github.io
- ✅ Branch: main
- ✅ URL: https://bgasitis.github.io

## Required Changes

### Step 1: Update package.json
- [ ] Add `homepage` field for correct asset paths
- [ ] Add ` predeploy` and `deploy` scripts for easy deployment

### Step 2: Update vite.config.ts
- [ ] Set `base: './'` for relative paths (important for subdirectory deployment)

### Step 3: Test Build Locally
- [ ] Run `npm run build` to verify the build works
- [ ] Test the build with `npm run preview`

### Step 4: Deploy to GitHub Pages
- [ ] Install `gh-pages` dependency (or use another method)
- [ ] Run `npm run deploy` to push build to GitHub
- [ ] Verify deployment on GitHub repository settings

## Important Notes
- Since this is a `*.github.io` repo, GitHub Pages serves from root
- The PWA service worker (`sw.js`) needs proper path configuration
- All assets should use relative paths for correct loading

## Commands to Deploy
```bash
npm install
npm run build
npm run deploy
```

## After Deployment
1. Go to Repository Settings → Pages
2. Ensure "Deploy from a branch" is selected
3. Source should be "main branch" and folder "/ (root)"
4. Wait 1-2 minutes for deployment to go live
5. Visit https://bgasitis.github.io to verify

