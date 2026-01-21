# Bhagavad Gita - As It Is (PWA)

A Progressive Web App to read and explore the Bhagavad Gita in Nepali and English with search, translations, and commentary.

## Features

- 📱 **Progressive Web App** - Install on mobile and desktop
- 🌐 **Offline Support** - Works without internet connection
- 🔍 **Full Text Search** - Search verses by chapter and verse number
- 🌍 **Multi-language** - Nepali and English translations
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Optimized with service workers

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your API key in [.env.local](.env.local):
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. For remote access (mobile testing):
   ```bash
   npm run start-remote
   ```

## Build for Production

```bash
npm run build
```

## Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
npm run deploy
```

## Access on Mobile

1. **Local Network**: `http://YOUR_IP:3000/bhagavad-gita-pwa/`
2. **Online**: Visit your GitHub Pages URL and install as PWA

## Project Structure

```
├── components/     # React components
├── data/          # Application data
├── public/        # Static assets
├── App.tsx        # Main app component
├── types.ts       # TypeScript types
└── vite.config.ts # Vite configuration
```

## Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons
- Workbox (Service Workers)
- vite-plugin-pwa

