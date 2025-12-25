import { useState, useEffect, useMemo } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import './ArtistDirectory.css';

interface Artist {
  id: number;
  title: string;
  birth_date?: number | null;
  death_date?: number | null;
  description?: string | null;
}

interface ArtistsResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: Artist[];
}

/**
 * Generate a unique DiceBear avatar URL for an artist based on their name
 * Uses the lorelei style for an artistic, hand-drawn look
 * The seed (artist name) ensures the avatar is unique and consistent
 */
const getArtistAvatar = (artistName: string): string => {
  // Encode the artist name to be URL-safe
  const encodedName = encodeURIComponent(artistName);
  
  // Use DiceBear's lorelei collection with the artist name as seed
  // flip=true adds variety, backgroundColor provides clean backgrounds
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodedName}&flip=true&backgroundColor=ffffff,f0f0f0`;
};

export default function ArtistDirectory() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchArtists() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://api.artic.edu/api/v1/agents?limit=40&fields=id,title,birth_date,death_date,description'
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch artists: ${response.statusText}`);
        }

        const data: ArtistsResponse = await response.json();
        setArtists(data.data || []);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError(err instanceof Error ? err.message : 'Failed to load artists');
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  // Filter artists based on search query
  const filteredArtists = useMemo(() => {
    if (!searchQuery.trim()) {
      return artists;
    }

    const query = searchQuery.toLowerCase().trim();
    return artists.filter((artist) =>
      artist.title.toLowerCase().includes(query)
    );
  }, [artists, searchQuery]);

  // Format dates
  const formatDates = (birth?: number | null, death?: number | null): string => {
    if (!birth && !death) return '';
    if (birth && death) return `${birth} - ${death}`;
    if (birth) return `b. ${birth}`;
    if (death) return `d. ${death}`;
    return '';
  };

  return (
    <div className="artist-directory">
      <div className="artist-directory-container">
        {/* Header */}
        <div className="artist-directory-header">
          <h1 className="artist-directory-title">The Creators</h1>
          
          {/* Search Bar */}
          <div className="artist-directory-search">
            <Search size={20} className="artist-directory-search-icon" />
            <input
              type="text"
              className="artist-directory-search-input"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="artist-directory-grid">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="artist-directory-skeleton">
                <div className="artist-directory-skeleton-image"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="artist-directory-error">
            <h2>Error Loading Artists</h2>
            <p>{error}</p>
          </div>
        )}

        {/* Artists Grid */}
        {!loading && !error && (
          <>
            {filteredArtists.length === 0 ? (
              <div className="artist-directory-empty">
                <p>No artists found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="artist-directory-grid">
                {filteredArtists.map((artist) => {
                  const dates = formatDates(artist.birth_date, artist.death_date);
                  const imageUrl = getArtistAvatar(artist.title);

                  return (
                    <div key={artist.id} className="artist-directory-card">
                      <div className="artist-directory-card-image-wrapper">
                        <img
                          src={imageUrl}
                          alt={artist.title}
                          className="artist-directory-card-image"
                          loading="lazy"
                        />
                        <div className="artist-directory-card-overlay">
                          <ArrowUpRight
                            size={24}
                            className="artist-directory-card-arrow"
                          />
                        </div>
                      </div>
                      <div className="artist-directory-card-content">
                        <h3 className="artist-directory-card-name">
                          {artist.title}
                        </h3>
                        {dates && (
                          <p className="artist-directory-card-dates">{dates}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

