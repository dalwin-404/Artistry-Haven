import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HavenVault from './components/HavenVault';
import Gallery from './components/Gallery';
import TrustedBy from './components/TrustedBy';
import ArtistsSection from './components/ArtistsSection';
import VermeerPaintings from './components/VermeerPaintings';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { useMetArtists } from './hooks/useMetArtists';
import { sampleArtists } from './data/sampleData';
import './App.css';

function App() {
  // Fetch artworks from The Art Institute of Chicago Public API
  const { artists: metArtists, loading: metLoading } = useMetArtists([
    { name: 'Vincent van Gogh', bio: 'Dutch Post-Impressionist painter known for bold colors and dramatic brushwork.', artworkLimit: 5 },
    { name: 'Claude Monet', bio: 'French Impressionist painter, founder of French Impressionist painting.', artworkLimit: 5 },
    { name: 'Pablo Picasso', bio: 'Spanish painter, sculptor, and printmaker, co-founder of the Cubist movement.', artworkLimit: 5 },
    { name: 'Georges Seurat', bio: 'French Post-Impressionist painter, known for developing pointillism.', artworkLimit: 5 },
    { name: 'Grant Wood', bio: 'American painter best known for his paintings depicting the rural American Midwest.', artworkLimit: 5 },
  ]);

  // Use Met API artists if loaded, otherwise fallback to sample data
  const artists = metArtists.length > 0 ? metArtists : sampleArtists;

  return (
    <div className="app">
      <Header />
      {metLoading && (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          background: '#f8f9fa',
          color: '#666'
        }}>
          Loading artworks from The Art Institute of Chicago...
        </div>
      )}
      <main>
        <Hero />
        <HavenVault artists={artists} />
        <Gallery artists={artists} />
        <TrustedBy />
        <ArtistsSection artists={artists} />
        <VermeerPaintings artists={artists} />
        <AboutSection />
        <ContactSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
