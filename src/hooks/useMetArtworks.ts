import { useState, useEffect } from 'react';
import { Artwork } from '../types';
import {
  searchByArtist,
  searchAICArtworks,
  transformAICArtworkToArtwork,
} from '../services/metApi';

interface UseMetArtworksOptions {
  artistName?: string;
  searchQuery?: string;
  limit?: number;
}

export function useMetArtworks(options: UseMetArtworksOptions = {}) {
  const { artistName, searchQuery, limit = 50 } = options;
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      setError(null);

      try {
        let aicArtworks = [];

        if (artistName) {
          aicArtworks = await searchByArtist(artistName, limit);
        } else if (searchQuery) {
          aicArtworks = await searchAICArtworks(searchQuery, limit);
        } else {
          setError('Either artistName or searchQuery must be provided');
          setLoading(false);
          return;
        }

        if (aicArtworks.length === 0) {
          setError('No artworks found');
          setLoading(false);
          return;
        }

        // Transform AIC artworks to our format
        const validArtworks = aicArtworks
          .filter((artwork) => artwork.image_id)
          .map((artwork, index) => transformAICArtworkToArtwork(artwork, index));

        setArtworks(validArtworks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch artworks');
        console.error('Error fetching AIC artworks:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArtworks();
  }, [artistName, searchQuery, limit]);

  return { artworks, loading, error };
}

