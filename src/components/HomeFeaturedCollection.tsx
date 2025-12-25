import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HomeFeaturedCollection.css';
import { getAICImageUrl } from '../services/metApi';

interface FeaturedArtwork {
  id: number;
  title: string;
  image_id: string;
  artist_display?: string;
}

interface ArtworksResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: Array<{
    id: number;
    title: string;
    image_id?: string | null;
    artist_display?: string;
  }>;
}

export default function HomeFeaturedCollection() {
  const [artworks, setArtworks] = useState<FeaturedArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedArtworks() {
      setLoading(true);
      setError(null);

      try {
        // Fetch 8 artworks to ensure we get at least 4 with valid images
        const response = await fetch(
          'https://api.artic.edu/api/v1/artworks?page=1&limit=8&fields=id,title,image_id,artist_display'
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch artworks: ${response.statusText}`);
        }

        const data: ArtworksResponse = await response.json();
        
        // Filter out artworks without image_id and take first 4
        const validArtworks = data.data
          .filter((artwork) => artwork.image_id !== null && artwork.image_id !== undefined)
          .slice(0, 4)
          .map((artwork) => ({
            id: artwork.id,
            title: artwork.title,
            image_id: artwork.image_id!,
            artist_display: artwork.artist_display,
          }));

        setArtworks(validArtworks);
      } catch (err) {
        console.error('Error fetching featured artworks:', err);
        setError(err instanceof Error ? err.message : 'Failed to load featured collection');
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedArtworks();
  }, []);

  return (
    <section className="home-featured-collection">
      <div className="home-featured-collection-container">
        {/* Header */}
        <div className="home-featured-collection-header">
          <h2 className="home-featured-collection-title">Curator's Picks</h2>
          <p className="home-featured-collection-subtitle">
            Highlights from the permanent collection.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="home-featured-collection-grid">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="home-featured-collection-skeleton">
                <div className="home-featured-collection-skeleton-image"></div>
                <div className="home-featured-collection-skeleton-text"></div>
                <div className="home-featured-collection-skeleton-text-small"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="home-featured-collection-error">
            <p>{error}</p>
          </div>
        )}

        {/* Artworks Grid */}
        {!loading && !error && artworks.length > 0 && (
          <>
            <div className="home-featured-collection-grid">
              {artworks.map((artwork) => (
                <Link
                  key={artwork.id}
                  to={`/artwork/${artwork.id}`}
                  className="home-featured-collection-card"
                >
                  <div className="home-featured-collection-card-image-wrapper">
                    <img
                      src={getAICImageUrl(artwork.image_id, 600)}
                      alt={artwork.title}
                      className="home-featured-collection-card-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="home-featured-collection-card-content">
                    <h3 className="home-featured-collection-card-title">
                      {artwork.title}
                    </h3>
                    {artwork.artist_display && (
                      <p className="home-featured-collection-card-artist">
                        {artwork.artist_display}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Call to Action */}
            <div className="home-featured-collection-cta">
              <Link to="/gallery" className="home-featured-collection-cta-button">
                View Entire Collection
                <ArrowRight size={20} className="home-featured-collection-cta-arrow" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

