import { useState, useEffect } from 'react';
import { Artist } from '../types';
import {
  searchByArtist,
  transformAICArtworkToArtwork,
} from '../services/metApi';

interface ArtistConfig {
  name: string;
  bio: string;
  avatarUrl?: string;
  artworkLimit?: number;
}

export function useMetArtists(artistConfigs: ArtistConfig[]) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtists() {
      setLoading(true);
      setError(null);

      try {
        const artistsData: Artist[] = [];

        for (let i = 0; i < artistConfigs.length; i++) {
          const config = artistConfigs[i];
          const limit = config.artworkLimit || 5;

          try {
            // Search for artworks by this artist (returns full artwork data)
            const aicArtworks = await searchByArtist(config.name, limit);

            if (aicArtworks.length === 0) {
              // If no artworks found, create artist with empty artworks array
              artistsData.push({
                id: `${i + 1}`,
                name: config.name,
                bio: config.bio,
                avatarUrl: config.avatarUrl,
                artworks: [],
              });
              continue;
            }

            // Transform AIC artworks to our format
            const artworks = aicArtworks
              .filter((artwork) => artwork.image_id)
              .map((artwork, index) => transformAICArtworkToArtwork(artwork, index));

            artistsData.push({
              id: `${i + 1}`,
              name: config.name,
              bio: config.bio,
              avatarUrl: config.avatarUrl,
              artworks,
            });
          } catch (err) {
            console.error(`Error fetching artworks for ${config.name}:`, err);
            // Still add the artist with empty artworks
            artistsData.push({
              id: `${i + 1}`,
              name: config.name,
              bio: config.bio,
              avatarUrl: config.avatarUrl,
              artworks: [],
            });
          }
        }

        setArtists(artistsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch artists');
        console.error('Error fetching AIC artists:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []); // Empty dependency array - only run once

  return { artists, loading, error };
}

