import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZoomIn, Share2, Heart, ArrowLeft } from 'lucide-react';
import './ArtworkDetail.css';
import { getAICImageUrl } from '../services/metApi';

interface ArtworkDetail {
  id: number;
  title: string;
  artist_display?: string;
  date_display?: string;
  medium_display?: string;
  dimensions?: string;
  description?: string;
  image_id?: string;
}

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<ArtworkDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    async function fetchArtwork() {
      if (!id) {
        setError('Artwork ID is required');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_display,date_display,medium_display,dimensions,description,image_id`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch artwork: ${response.statusText}`);
        }

        const data = await response.json();
        const artworkData = data.data;

        if (!artworkData) {
          throw new Error('Artwork not found');
        }

        setArtwork(artworkData);
      } catch (err) {
        console.error('Error fetching artwork:', err);
        setError(err instanceof Error ? err.message : 'Failed to load artwork');
      } finally {
        setLoading(false);
      }
    }

    fetchArtwork();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share && artwork) {
      try {
        await navigator.share({
          title: artwork.title,
          text: `Check out "${artwork.title}" by ${artwork.artist_display || 'Unknown Artist'}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement actual favorite functionality with backend/state management
  };

  if (loading) {
    return (
      <div className="artwork-detail">
        <div className="artwork-detail-container">
          {/* Skeleton Loader */}
          <div className="artwork-detail-skeleton">
            <div className="artwork-detail-skeleton-left">
              <div className="artwork-detail-skeleton-image"></div>
            </div>
            <div className="artwork-detail-skeleton-right">
              <div className="artwork-detail-skeleton-title"></div>
              <div className="artwork-detail-skeleton-artist"></div>
              <div className="artwork-detail-skeleton-date"></div>
              <div className="artwork-detail-skeleton-actions"></div>
              <div className="artwork-detail-skeleton-details"></div>
              <div className="artwork-detail-skeleton-description"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="artwork-detail">
        <div className="artwork-detail-container">
          <div className="artwork-detail-error">
            <h2>Error Loading Artwork</h2>
            <p>{error || 'Artwork not found'}</p>
            <button
              className="artwork-detail-back-btn"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = artwork.image_id
    ? getAICImageUrl(artwork.image_id, 1200)
    : null;

  return (
    <div className="artwork-detail">
      <div className="artwork-detail-container">
        {/* Back Button */}
        <button
          className="artwork-detail-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="artwork-detail-content">
          {/* Left Column: Artwork Image */}
          <div className="artwork-detail-image-section">
            <div className="artwork-detail-image-wrapper">
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt={artwork.title}
                    className="artwork-detail-image"
                  />
                  <button
                    className="artwork-detail-zoom-btn"
                    onClick={() => setIsZoomed(true)}
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={24} />
                  </button>
                </>
              ) : (
                <div className="artwork-detail-no-image">
                  <p>Image not available</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Metadata */}
          <div className="artwork-detail-metadata">
            {/* Header */}
            <div className="artwork-detail-header">
              <h1 className="artwork-detail-title">{artwork.title}</h1>
              {artwork.artist_display && (
                <p className="artwork-detail-artist">{artwork.artist_display}</p>
              )}
              {artwork.date_display && (
                <p className="artwork-detail-date">{artwork.date_display}</p>
              )}
            </div>

            {/* Action Row */}
            <div className="artwork-detail-actions">
              <button
                className={`artwork-detail-favorite-btn ${
                  isFavorite ? 'favorited' : ''
                }`}
                onClick={handleToggleFavorite}
                aria-label="Add to favorites"
              >
                <Heart
                  size={20}
                  fill={isFavorite ? 'currentColor' : 'none'}
                />
                <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
              </button>
              <button
                className="artwork-detail-share-btn"
                onClick={handleShare}
                aria-label="Share artwork"
              >
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>

            {/* Details Block */}
            <div className="artwork-detail-details">
              <h3 className="artwork-detail-details-title">Details</h3>
              <dl className="artwork-detail-details-list">
                {artwork.medium_display && (
                  <>
                    <dt>Medium</dt>
                    <dd>{artwork.medium_display}</dd>
                  </>
                )}
                {artwork.dimensions && (
                  <>
                    <dt>Dimensions</dt>
                    <dd>{artwork.dimensions}</dd>
                  </>
                )}
              </dl>
            </div>

            {/* Description */}
            {artwork.description && (
              <div className="artwork-detail-description">
                <h3 className="artwork-detail-description-title">About</h3>
                <div
                  className="artwork-detail-description-content"
                  dangerouslySetInnerHTML={{ __html: artwork.description }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && imageUrl && (
        <div
          className="artwork-detail-zoom-modal"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="artwork-detail-zoom-close"
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoom"
          >
            ×
          </button>
          <img
            src={getAICImageUrl(artwork.image_id!, 2000)}
            alt={artwork.title}
            className="artwork-detail-zoom-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

