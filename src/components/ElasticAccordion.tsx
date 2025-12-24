import { useState } from 'react';
import { Artist } from '../types';
import './ElasticAccordion.css';

interface ElasticAccordionProps {
  artists: Artist[];
}

// Icon components
const PaintbrushIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.71 4.63L19.37 3.29C19 2.9 18.35 2.9 17.96 3.29L9 12.25L11.75 15L20.71 6.04C21.1 5.65 21.1 5 20.71 4.63Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12.25L6.25 15L9 17.75L11.75 15L9 12.25Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 20H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CameraIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 4H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="13"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChiselIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.7 6.3L17.7 3.3C18.1 2.9 18.7 2.9 19.1 3.3L20.7 4.9C21.1 5.3 21.1 5.9 20.7 6.3L17.7 9.3L14.7 6.3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 21L9 15L14.7 20.7L8.7 21L3 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 15L12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DigitalArtIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="3"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 21H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="7"
      cy="8"
      r="1"
      fill="currentColor"
    />
    <circle
      cx="12"
      cy="8"
      r="1"
      fill="currentColor"
    />
    <circle
      cx="17"
      cy="8"
      r="1"
      fill="currentColor"
    />
  </svg>
);

// Function to get icon based on medium
const getIconForMedium = (medium: string) => {
  const mediumLower = medium.toLowerCase();
  
  if (mediumLower.includes('photography') || mediumLower.includes('photo')) {
    return <CameraIcon />;
  }
  
  if (mediumLower.includes('sculpture') || mediumLower.includes('sculpt')) {
    return <ChiselIcon />;
  }
  
  if (mediumLower.includes('digital')) {
    return <DigitalArtIcon />;
  }
  
  // Default to paintbrush for painting mediums (acrylic, oil, watercolor, pastel, etc.)
  return <PaintbrushIcon />;
};

export default function ElasticAccordion({ artists }: ElasticAccordionProps) {
  // Get first 5 artworks for the accordion
  const accordionItems = artists
    .flatMap(artist =>
      artist.artworks.map(artwork => ({
        artwork,
        artist,
      }))
    )
    .slice(0, 5);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="elastic-accordion-container">
      {accordionItems.map(({ artwork, artist }, index) => (
        <div
          key={artwork.id}
          className={`elastic-accordion-card ${index === activeIndex ? 'active' : ''}`}
          onClick={() => handleCardClick(index)}
          style={{
            backgroundImage: `url(${artwork.imageUrl})`,
          }}
        >
          <div className="elastic-accordion-overlay"></div>
          <div className="elastic-accordion-content">
            <div className="elastic-accordion-icon">
              {getIconForMedium(artwork.medium)}
            </div>
            <div className="elastic-accordion-text">
              <h3 className="elastic-accordion-title">{artwork.title}</h3>
              <p className="elastic-accordion-artist">by {artist.name}</p>
              <p className="elastic-accordion-description">{artwork.description}</p>
              <p className="elastic-accordion-medium">{artwork.medium}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

