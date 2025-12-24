# Artistry Haven

A beautiful React website for showcasing artwork from talented artists around the world.

## Features

- **Art Gallery**: Browse a stunning collection of artworks in a responsive grid layout
- **Artist Profiles**: View featured artists with their bios and artwork counts
- **Search & Filter**: Search artworks by title, artist, medium, or description, and filter by artist
- **Modern UI**: Clean, modern design with smooth animations and hover effects
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/        # React components
  │   ├── Header.tsx    # Site header with navigation
  │   ├── Gallery.tsx   # Main gallery component with search/filter
  │   ├── ArtCard.tsx   # Individual artwork card
  │   ├── ArtistsSection.tsx  # Artists showcase section
  │   └── Footer.tsx    # Site footer
  ├── data/             # Sample data
  │   └── sampleData.ts # Artist and artwork data
  ├── types.ts          # TypeScript type definitions
  ├── App.tsx           # Main app component
  └── main.tsx          # App entry point
```

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 (no external CSS frameworks)

## License

MIT

