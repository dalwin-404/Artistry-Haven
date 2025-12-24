import { useState } from 'react';
import { Artist } from '../types';
import './ArtistsSection.css';

// Import team images
import artist1 from '../assets/team/artist1.jpg';
import artist2 from '../assets/team/artist2.jpg';
import artist3 from '../assets/team/artist3.jpg';
import artist4 from '../assets/team/artist4.jpg';
import artist5 from '../assets/team/artist5.jpg';

interface ArtistsSectionProps {
  artists: Artist[];
}

// Featured artists data
const featuredArtistsData = [
  {
    id: '1',
    name: 'Elena Martinez',
    role: 'Oil Painter',
    imageUrl: artist1,
    description: 'Contemporary painter specializing in abstract expressionism and vibrant color compositions.',
  },
  {
    id: '2',
    name: 'James Chen',
    role: 'Digital Artist',
    imageUrl: artist2,
    description: 'Digital artist and photographer pushing boundaries between reality and imagination.',
  },
  {
    id: '3',
    name: 'Sophie Anderson',
    role: 'Mixed Media Artist',
    imageUrl: artist3,
    description: 'Sculptor and mixed media artist exploring the intersection of nature and human experience.',
  },
  {
    id: '4',
    name: 'Marcus Thompson',
    role: 'Street Artist',
    imageUrl: artist4,
    description: 'Street artist and muralist bringing color and life to urban landscapes.',
  },
  {
    id: '5',
    name: 'Isabella Rossi',
    role: 'Portrait Painter',
    imageUrl: artist5,
    description: 'Classical painter with a modern twist, specializing in portraiture and figurative work.',
  },
];

// Arrow icon component
const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ArtistsSection({ artists }: ArtistsSectionProps) {
  const [activeArtist, setActiveArtist] = useState<string>(featuredArtistsData[0].id);

  const handleCardClick = (artistId: string) => {
    setActiveArtist(artistId);
  };

  return (
    <section className="featured-artists-section" id="artists">
      <div className="featured-artists-container">
        <div className="featured-artists-header">
          <h2 className="featured-artists-title">Featured Artists</h2>
          <p className="featured-artists-subtitle">Meet the talented creators behind the art</p>
        </div>
        <div className="expanding-cards-container">
          {featuredArtistsData.map((artist) => {
            const isActive = activeArtist === artist.id;
            return (
              <div
                key={artist.id}
                className={`expanding-card ${isActive ? 'active' : ''}`}
                onClick={() => handleCardClick(artist.id)}
                style={{
                  backgroundImage: `url(${artist.imageUrl})`,
                }}
              >
                <div className="expanding-card-overlay"></div>
                <div className="expanding-card-content">
                  {!isActive ? (
                    <div className="expanding-card-name-vertical">
                      {artist.name}
                    </div>
                  ) : (
                    <div className="expanding-card-details">
                      <h3 className="expanding-card-name">{artist.name}</h3>
                      <p className="expanding-card-role">{artist.role}</p>
                      <p className="expanding-card-description">{artist.description}</p>
                      <button className="expanding-card-button">
                        View Portfolio
                        <ArrowIcon />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
