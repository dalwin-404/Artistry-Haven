import { useMemo } from 'react';
import { Artist } from '../types';
import SwipeablePhotoStack from './SwipeablePhotoStack';
import './HavenVault.css';

interface HavenVaultProps {
  artists: Artist[];
}

export default function HavenVault({ artists }: HavenVaultProps) {
  // Prepare photos for swipeable stack from all artworks
  const stackPhotos = useMemo(() => {
    return artists.flatMap(artist =>
      artist.artworks.map(artwork => ({
        id: artwork.id,
        imageUrl: artwork.imageUrl,
        title: artwork.title,
        artist: artist.name,
        description: artwork.description,
      }))
    );
  }, [artists]);

  return (
    <section className="haven-vault-section">
      <div className="haven-vault-container">
        <h2 className="haven-vault-heading">The Haven Vault</h2>
        <p className="haven-vault-subtitle">
          Discover extraordinary artworks by swiping through our curated collection
        </p>
        <SwipeablePhotoStack photos={stackPhotos} />
      </div>
    </section>
  );
}

