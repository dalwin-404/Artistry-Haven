import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { Heart, Filter, X } from 'lucide-react';
import './GalleryFeed.css';
import { getAICImageUrl } from '../services/metApi';

interface GalleryArtwork {
  id: number;
  title: string;
  artist_display?: string;
  image_id?: string;
  date_display?: string;
  medium_display?: string;
}

interface AICArtworkResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: GalleryArtwork[];
}

export default function GalleryFeed() {
  const [artworks, setArtworks] = useState<GalleryArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  
  // Filter states
  const [selectedMediums, setSelectedMediums] = useState<Set<string>>(new Set());

  // Fetch artworks from AIC API
  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=20&fields=id,title,artist_display,image_id,date_display,medium_display`
        );

        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }

        const data: AICArtworkResponse = await response.json();

        // Filter out items without image_id
        const artworksWithImages = data.data.filter(
          (artwork) => artwork.image_id
        );

        if (currentPage === 1) {
          setArtworks(artworksWithImages);
        } else {
          setArtworks((prev) => [...prev, ...artworksWithImages]);
        }

        // Check if there are more pages
        setHasMore(
          data.pagination.current_page < data.pagination.total_pages
        );
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtworks();
  }, [currentPage]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const toggleFavorite = (artworkId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(artworkId)) {
        newFavorites.delete(artworkId);
      } else {
        newFavorites.add(artworkId);
      }
      return newFavorites;
    });
  };

  // Handle medium filter toggle
  const toggleMediumFilter = (medium: string) => {
    setSelectedMediums((prev) => {
      const newMediums = new Set(prev);
      if (newMediums.has(medium)) {
        newMediums.delete(medium);
      } else {
        newMediums.add(medium);
      }
      return newMediums;
    });
    // Reset to page 1 when filters change
    setCurrentPage(1);
  };

  // Extract unique mediums from artworks
  const availableMediums = useMemo(() => {
    const mediums = new Set<string>();
    artworks.forEach((artwork) => {
      if (artwork.medium_display) {
        // Extract common medium types from the display string
        const mediumLower = artwork.medium_display.toLowerCase();
        if (mediumLower.includes('oil') && mediumLower.includes('canvas')) {
          mediums.add('Oil on Canvas');
        } else if (mediumLower.includes('watercolor')) {
          mediums.add('Watercolor');
        } else if (mediumLower.includes('acrylic')) {
          mediums.add('Acrylic');
        } else if (mediumLower.includes('digital') || mediumLower.includes('print')) {
          mediums.add('Digital');
        }
      }
    });
    return Array.from(mediums).sort();
  }, [artworks]);

  // Filter artworks based on selected mediums
  const filteredArtworks = useMemo(() => {
    if (selectedMediums.size === 0) {
      return artworks;
    }

    return artworks.filter((artwork) => {
      if (!artwork.medium_display) return false;
      
      const mediumLower = artwork.medium_display.toLowerCase();
      
      // Check if artwork matches any selected medium
      return Array.from(selectedMediums).some((selectedMedium) => {
        if (selectedMedium === 'Oil on Canvas') {
          return mediumLower.includes('oil') && mediumLower.includes('canvas');
        } else if (selectedMedium === 'Watercolor') {
          return mediumLower.includes('watercolor');
        } else if (selectedMedium === 'Acrylic') {
          return mediumLower.includes('acrylic');
        } else if (selectedMedium === 'Digital') {
          return mediumLower.includes('digital') || mediumLower.includes('print');
        }
        return false;
      });
    });
  }, [artworks, selectedMediums]);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    768: 1,
  };

  return (
    <div className="gallery-feed">
      {/* Mobile Filter Button */}
      <button
        className="gallery-feed-mobile-filter-btn"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        aria-label="Toggle filters"
      >
        <Filter size={20} />
        Filters
      </button>

      <div className="gallery-feed-container">
        {/* Sidebar - Filters */}
        <aside
          className={`gallery-feed-sidebar ${
            mobileFiltersOpen ? 'sidebar-open' : ''
          }`}
        >
          <div className="gallery-feed-sidebar-header">
            <h2 className="gallery-feed-sidebar-title">Filters</h2>
            <button
              className="gallery-feed-sidebar-close"
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>

          <div className="gallery-feed-filters">
            {/* Medium Filter */}
            <div className="gallery-feed-filter-group">
              <label className="gallery-feed-filter-label">Medium</label>
              <div className="gallery-feed-filter-options">
                {availableMediums.length > 0 ? (
                  availableMediums.map((medium) => (
                    <label key={medium} className="gallery-feed-filter-option">
                      <input
                        type="checkbox"
                        checked={selectedMediums.has(medium)}
                        onChange={() => toggleMediumFilter(medium)}
                      />
                      <span>{medium}</span>
                    </label>
                  ))
                ) : (
                  <p className="gallery-feed-filter-empty">
                    No medium data available
                  </p>
                )}
              </div>
              {selectedMediums.size > 0 && (
                <button
                  className="gallery-feed-filter-clear"
                  onClick={() => setSelectedMediums(new Set())}
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Note about filtering */}
            <p className="gallery-feed-filter-note">
              * Filters are based on available artwork data. The AIC public API
              doesn't provide price information.
            </p>
          </div>
        </aside>

        {/* Main Content - Masonry Grid */}
        <main className="gallery-feed-main">
          {loading && artworks.length === 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="gallery-feed-masonry"
              columnClassName="gallery-feed-masonry-column"
            >
              {[...Array(9)].map((_, index) => (
                <div key={index} className="gallery-feed-skeleton">
                  <div className="gallery-feed-skeleton-image"></div>
                  <div className="gallery-feed-skeleton-text"></div>
                </div>
              ))}
            </Masonry>
          ) : (
            <>
              {filteredArtworks.length === 0 && !loading ? (
                <div className="gallery-feed-empty">
                  <p>No artworks found matching your filters.</p>
                  <button
                    className="gallery-feed-clear-filters-btn"
                    onClick={() => setSelectedMediums(new Set())}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="gallery-feed-masonry"
                  columnClassName="gallery-feed-masonry-column"
                >
                  {filteredArtworks.map((artwork) => {
                  // Create a URL-friendly artist name for routing
                  const artistSlug = artwork.artist_display
                    ? encodeURIComponent(artwork.artist_display.replace(/\s+/g, '-').toLowerCase())
                    : 'unknown';
                  
                  return (
                    <div key={artwork.id} className="gallery-feed-card">
                      <Link
                        to={`/artwork/${artwork.id}`}
                        className="gallery-feed-card-link"
                      >
                        <div className="gallery-feed-card-image-wrapper">
                          <img
                            src={getAICImageUrl(artwork.image_id, 843)}
                            alt={artwork.title}
                            className="gallery-feed-card-image"
                            loading="lazy"
                          />
                          <div className="gallery-feed-card-overlay">
                            <button
                              className={`gallery-feed-card-heart ${
                                favorites.has(artwork.id) ? 'favorited' : ''
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(artwork.id);
                              }}
                              aria-label="Add to favorites"
                            >
                              <Heart
                                size={24}
                                fill={favorites.has(artwork.id) ? 'currentColor' : 'none'}
                              />
                            </button>
                            {artwork.artist_display && (
                              <Link
                                to={`/artist/${artistSlug}`}
                                className="gallery-feed-card-artist"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {artwork.artist_display}
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className="gallery-feed-card-content">
                          <h3 className="gallery-feed-card-title">{artwork.title}</h3>
                          {artwork.date_display && (
                            <p className="gallery-feed-card-date">
                              {artwork.date_display}
                            </p>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
                </Masonry>
              )}

              {/* Load More Button */}
              {hasMore && (
                <div className="gallery-feed-load-more">
                  <button
                    className="gallery-feed-load-more-btn"
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

