import { useEffect, useState, useMemo } from 'react';
import { Artist } from '../types';
import {
  searchAICArtworks,
  transformAICArtworkToArtwork,
  AICArtwork,
} from '../services/metApi';
import './VermeerPaintings.css';

interface VermeerPaintingsProps {
  artists?: Artist[];
}

interface ArtworkWithArtist {
  artwork: {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    medium: string;
    year: number;
    dimensions?: string;
  };
  artistName: string;
}

// Icon component for card interaction
const ViewIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function VermeerPaintings(_props: VermeerPaintingsProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allAICArtworks, setAllAICArtworks] = useState<AICArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch artworks from AIC API on component mount
  useEffect(() => {
    async function fetchInitialArtworks() {
      setLoading(true);
      setError(null);

      try {
        // Fetch a diverse collection of artworks (limited to 15)
        const artworks = await searchAICArtworks('', 15);
        setAllAICArtworks(artworks);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch artworks'
        );
        console.error('Error fetching artworks:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialArtworks();
  }, []);

  // Filter artworks based on search query
  const filteredArtworks = useMemo(() => {
    if (!searchQuery.trim()) {
      return allAICArtworks;
    }

    const query = searchQuery.toLowerCase().trim();
    return allAICArtworks.filter(
      (artwork) =>
        artwork.title?.toLowerCase().includes(query) ||
        artwork.artist_display?.toLowerCase().includes(query) ||
        artwork.artist_title?.toLowerCase().includes(query)
    );
  }, [allAICArtworks, searchQuery]);

  // Transform filtered artworks to our format with artist names
  const allArtworks: ArtworkWithArtist[] = useMemo(() => {
    return filteredArtworks
      .filter((artwork) => artwork.image_id)
      .map((artwork, index) => ({
        artwork: transformAICArtworkToArtwork(artwork, index),
        artistName:
          artwork.artist_display || artwork.artist_title || 'Unknown Artist',
      }));
  }, [filteredArtworks]);

  // Handle card click/interaction
  const handleCardClick = (artworkId: string) => {
    // You can add navigation or modal opening logic here
    console.log('View artwork:', artworkId);
  };

  return (
    <section className="col-scroll-section" id="art-collection">
      <div className="col-scroll-header">
        <h2 className="col-scroll-heading">Art Collection</h2>
        <p className="col-scroll-subtitle">
          Explore artworks from The Art Institute of Chicago
        </p>

        {/* Search Bar */}
        <div className="col-scroll-search-container">
          <input
            type="text"
            className="col-scroll-search-input"
            placeholder="Search by title or artist name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
          {loading && (
            <div className="col-scroll-loading-indicator">Loading...</div>
          )}
          {error && allArtworks.length === 0 && (
            <div className="col-scroll-error-message">{error}</div>
          )}
        </div>
      </div>
      {allArtworks.length > 0 ? (
        <div className="artwork-grid">
          {allArtworks.map(({ artwork, artistName }) => (
            <div
              key={artwork.id}
              className="artwork-card"
              onClick={() => handleCardClick(artwork.id)}
            >
              <div className="artwork-card__image-container">
                <img
                  className="artwork-card__image"
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  loading="lazy"
                />
                <div className="artwork-card__overlay"></div>
                <div className="artwork-card__icon">
                  <ViewIcon />
                </div>
              </div>
              <div className="artwork-card__content">
                <h3 className="artwork-card__title">{artwork.title}</h3>
                <p className="artwork-card__category">{artistName}</p>
                <p className="artwork-card__description">
                  {artwork.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && !error ? (
        <div className="artwork-grid__empty">
          <p>No artworks found. Try a different search term.</p>
        </div>
      ) : null}
    </section>
  );
}
