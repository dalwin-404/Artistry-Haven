import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import HavenVault from './components/HavenVault';
import TrustedBy from './components/TrustedBy';
import HomeFeaturedCollection from './components/HomeFeaturedCollection';
import AboutSections from './components/AboutSections';
import Newsletter from './components/Newsletter';
import GalleryFeed from './components/GalleryFeed';
import ArtistProfile from './components/ArtistProfile';
import ArtworkDetail from './components/ArtworkDetail';
import ArtistApplication from './components/ArtistApplication';
import Exhibitions from './components/Exhibitions';
import Learn from './components/Learn';
import ArtistDirectory from './components/ArtistDirectory';
import About from './components/About';
import Footer from './components/Footer';
import { useMetArtists } from './hooks/useMetArtists';
import { sampleArtists } from './data/sampleData';
import './App.css';

function HomePage() {
  const { artists: metArtists, loading: metLoading } = useMetArtists([
    { name: 'Vincent van Gogh', bio: 'Dutch Post-Impressionist painter known for bold colors and dramatic brushwork.', artworkLimit: 5 },
    { name: 'Claude Monet', bio: 'French Impressionist painter, founder of French Impressionist painting.', artworkLimit: 5 },
    { name: 'Pablo Picasso', bio: 'Spanish painter, sculptor, and printmaker, co-founder of the Cubist movement.', artworkLimit: 5 },
    { name: 'Georges Seurat', bio: 'French Post-Impressionist painter, known for developing pointillism.', artworkLimit: 5 },
    { name: 'Grant Wood', bio: 'American painter best known for his paintings depicting the rural American Midwest.', artworkLimit: 5 },
  ]);

  const artists = metArtists.length > 0 ? metArtists : sampleArtists;

  return (
    <>
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
      <Hero />
      <HavenVault artists={artists} />
      <TrustedBy />
      <HomeFeaturedCollection />
      <AboutSections />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryFeed />} />
          <Route path="/artist/:artistName" element={<ArtistProfile />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/apply" element={<ArtistApplication />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/artists" element={<ArtistDirectory />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
