import { Artwork, Artist } from '../types';
import './ArtCard.css';

interface ArtCardProps {
  artwork: Artwork;
  artist: Artist;
}

export default function ArtCard({ artwork, artist }: ArtCardProps) {
  return (
    <article className="art-card">
      <div className="art-card-image-container">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="art-card-image"
          loading="lazy"
        />
        <div className="art-card-overlay">
          <div className="art-card-info">
            <h3 className="art-card-title">{artwork.title}</h3>
            <p className="art-card-artist">by {artist.name}</p>
          </div>
        </div>
      </div>
      <div className="art-card-details">
        <div className="art-card-meta">
          <span className="art-card-medium">{artwork.medium}</span>
          <span className="art-card-year">{artwork.year}</span>
        </div>
        <p className="art-card-description">{artwork.description}</p>
        {artwork.dimensions && (
          <p className="art-card-dimensions">{artwork.dimensions}</p>
        )}
      </div>
    </article>
  );
}

