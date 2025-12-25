import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserPlus, MessageCircle, Instagram, Twitter, Facebook } from 'lucide-react';
import './ArtistProfile.css';
import { searchByArtist, getAICImageUrl } from '../services/metApi';

interface ArtistProfileProps {
  artist?: {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    coverImageUrl: string;
    location: string;
    followers: number;
    artworksCount: number;
    bio?: string;
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
    };
  };
}

// Sample artist data - Replace with actual data from props or API
const defaultArtist = {
  id: '1',
  name: 'Elena Martinez',
  role: 'Abstract Painter',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  coverImageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&h=400&fit=crop',
  location: 'London, UK',
  followers: 1200,
  artworksCount: 45,
  bio: 'Contemporary artist specializing in abstract expressionism. My work explores the intersection of color, emotion, and movement. Each piece tells a story through vibrant compositions and bold brushstrokes.',
  socialLinks: {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
  },
};

export default function ArtistProfile({ artist: propArtist }: ArtistProfileProps) {
  const { artistName } = useParams<{ artistName: string }>();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'about' | 'reviews'>('portfolio');
  const [isFollowing, setIsFollowing] = useState(false);
  const [artist, setArtist] = useState(propArtist || defaultArtist);
  const [artworks, setArtworks] = useState<Array<{ id: string; imageUrl: string; title: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Fetch artist data and artworks from API
  useEffect(() => {
    async function fetchArtistData() {
      if (!artistName) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Decode the artist name from URL slug
        const decodedName = decodeURIComponent(artistName.replace(/-/g, ' '));
        
        // Fetch artworks by artist name
        const fetchedArtworks = await searchByArtist(decodedName, 20);
        
        if (fetchedArtworks.length > 0) {
          // Get first artwork for cover image
          const firstArtwork = fetchedArtworks[0];
          const coverImageUrl = firstArtwork.image_id
            ? getAICImageUrl(firstArtwork.image_id, 1600)
            : defaultArtist.coverImageUrl;

          // Get avatar (use first artwork image or default)
          const avatarUrl = firstArtwork.image_id
            ? getAICImageUrl(firstArtwork.image_id, 200)
            : defaultArtist.avatarUrl;

          // Transform artworks for portfolio
          const portfolioArtworks = fetchedArtworks
            .filter((art) => art.image_id)
            .map((art) => ({
              id: art.id.toString(),
              imageUrl: getAICImageUrl(art.image_id, 600),
              title: art.title,
            }));

          // Determine role from classification or style
          const role = firstArtwork.classification_title || 
                      firstArtwork.style_title || 
                      'Artist';

          // Set artist data
          setArtist({
            id: firstArtwork.id.toString(),
            name: decodedName,
            role: role,
            avatarUrl: avatarUrl,
            coverImageUrl: coverImageUrl,
            location: firstArtwork.place_of_origin || 'Location Unknown',
            followers: Math.floor(Math.random() * 2000) + 500, // Random followers for demo
            artworksCount: portfolioArtworks.length,
            bio: firstArtwork.description || `Works by ${decodedName}. ${firstArtwork.medium_display || ''}`,
            socialLinks: defaultArtist.socialLinks,
          });

          setArtworks(portfolioArtworks);
        }
      } catch (error) {
        console.error('Error fetching artist data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtistData();
  }, [artistName]);

  const formatFollowers = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Use fetched artworks or fallback to sample
  const displayArtworks = artworks.length > 0 ? artworks : [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop', title: 'Cosmic Dreams' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=600&fit=crop', title: 'Urban Symphony' },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=600&fit=crop', title: 'Ocean Whispers' },
  ];

  return (
    <div className="artist-profile">
      {/* Header Section */}
      <div className="artist-profile-header">
        <div className="artist-profile-cover">
          <img
            src={artist.coverImageUrl}
            alt={`${artist.name} cover`}
            className="artist-profile-cover-image"
          />
        </div>

        {/* Floating Profile Card */}
        <div className="artist-profile-card">
          <div className="artist-profile-avatar-wrapper">
            <img
              src={artist.avatarUrl}
              alt={artist.name}
              className="artist-profile-avatar"
            />
          </div>
          <div className="artist-profile-info">
            <h1 className="artist-profile-name">{artist.name}</h1>
            <p className="artist-profile-role">{artist.role}</p>
            <div className="artist-profile-actions">
              <button
                className={`artist-profile-follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={handleFollow}
              >
                <UserPlus size={18} />
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="artist-profile-message-btn">
                <MessageCircle size={18} />
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="artist-profile-stats">
        <div className="artist-profile-stat">
          <span className="artist-profile-stat-value">
            {formatFollowers(artist.followers)}
          </span>
          <span className="artist-profile-stat-label">Followers</span>
        </div>
        <div className="artist-profile-stat">
          <span className="artist-profile-stat-value">{artist.artworksCount}</span>
          <span className="artist-profile-stat-label">Artworks</span>
        </div>
        <div className="artist-profile-stat">
          <span className="artist-profile-stat-value">{artist.location}</span>
          <span className="artist-profile-stat-label">Location</span>
        </div>
        {artist.socialLinks && (
          <div className="artist-profile-social">
            {artist.socialLinks.instagram && (
              <a
                href={artist.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="artist-profile-social-link"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
            {artist.socialLinks.twitter && (
              <a
                href={artist.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="artist-profile-social-link"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            )}
            {artist.socialLinks.facebook && (
              <a
                href={artist.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="artist-profile-social-link"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="artist-profile-tabs">
        <button
          className={`artist-profile-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfolio
        </button>
        <button
          className={`artist-profile-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button
          className={`artist-profile-tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="artist-profile-content">
        {activeTab === 'portfolio' && (
          <div className="artist-profile-portfolio">
            {loading ? (
              <div className="artist-profile-loading">Loading artworks...</div>
            ) : (
              <div className="artist-profile-grid">
                {displayArtworks.map((artwork) => (
                <div key={artwork.id} className="artist-profile-artwork">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="artist-profile-artwork-image"
                  />
                  <div className="artist-profile-artwork-overlay">
                    <h3 className="artist-profile-artwork-title">{artwork.title}</h3>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="artist-profile-about">
            <h2 className="artist-profile-about-title">About</h2>
            <p className="artist-profile-about-text">{artist.bio || 'No biography available.'}</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="artist-profile-reviews">
            <h2 className="artist-profile-reviews-title">Reviews</h2>
            <div className="artist-profile-reviews-list">
              <div className="artist-profile-review">
                <div className="artist-profile-review-header">
                  <div className="artist-profile-review-author">
                    <div className="artist-profile-review-avatar">JD</div>
                    <div>
                      <h4 className="artist-profile-review-name">John Doe</h4>
                      <p className="artist-profile-review-date">2 weeks ago</p>
                    </div>
                  </div>
                  <div className="artist-profile-review-rating">★★★★★</div>
                </div>
                <p className="artist-profile-review-text">
                  Absolutely stunning work! Elena's use of color and composition is
                  breathtaking. I've purchased several pieces and they never fail to
                  inspire.
                </p>
              </div>
              <div className="artist-profile-review">
                <div className="artist-profile-review-header">
                  <div className="artist-profile-review-author">
                    <div className="artist-profile-review-avatar">SM</div>
                    <div>
                      <h4 className="artist-profile-review-name">Sarah Miller</h4>
                      <p className="artist-profile-review-date">1 month ago</p>
                    </div>
                  </div>
                  <div className="artist-profile-review-rating">★★★★☆</div>
                </div>
                <p className="artist-profile-review-text">
                  Beautiful abstract pieces that add so much character to my space.
                  The quality is exceptional and the shipping was prompt.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

