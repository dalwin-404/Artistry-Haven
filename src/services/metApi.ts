// Art Institute of Chicago Public API service
const AIC_API_BASE = 'https://api.artic.edu/api/v1';
const AIC_IIIF_BASE = 'https://www.artic.edu/iiif/2';

export interface AICArtwork {
  id: number;
  title: string;
  artist_display?: string;
  artist_title?: string;
  date_display?: string;
  date_start?: number;
  date_end?: number;
  medium_display?: string;
  dimensions?: string;
  place_of_origin?: string;
  description?: string;
  image_id?: string;
  thumbnail?: {
    lqip?: string;
    width?: number;
    height?: number;
    alt_text?: string;
  };
  classification_title?: string;
  style_title?: string;
  department_title?: string;
}

export interface AICSearchResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: AICArtwork[];
  config: {
    iiif_url: string;
    website_url: string;
  };
}

/**
 * Construct IIIF image URL from image_id
 */
export function getAICImageUrl(
  imageId: string | null | undefined,
  size: number = 843
): string {
  if (!imageId) {
    return '';
  }
  // IIIF format: https://www.artic.edu/iiif/2/{image_id}/full/{width},/0/default.jpg
  return `${AIC_IIIF_BASE}/${imageId}/full/${size},/0/default.jpg`;
}

/**
 * Search for artworks in The Art Institute of Chicago collection
 */
export async function searchAICArtworks(
  query: string,
  limit: number = 100
): Promise<AICArtwork[]> {
  try {
    const response = await fetch(
      `${AIC_API_BASE}/artworks/search?q=${encodeURIComponent(
        query
      )}&limit=${limit}&fields=id,title,artist_display,artist_title,date_display,date_start,date_end,medium_display,dimensions,place_of_origin,description,image_id,thumbnail,classification_title,style_title,department_title`
    );

    if (!response.ok) {
      throw new Error(`AIC API search failed: ${response.statusText}`);
    }

    const data: AICSearchResponse = await response.json();

    // Filter artworks that have images
    return data.data?.filter((artwork) => artwork.image_id) || [];
  } catch (error) {
    console.error('Error searching AIC artworks:', error);
    return [];
  }
}

/**
 * Search for artworks by artist name
 */
export async function searchByArtist(
  artistName: string,
  limit: number = 100
): Promise<AICArtwork[]> {
  try {
    // Search by artist name using the query parameter
    const response = await fetch(
      `${AIC_API_BASE}/artworks/search?q=${encodeURIComponent(
        artistName
      )}&limit=${limit}&fields=id,title,artist_display,artist_title,date_display,date_start,date_end,medium_display,dimensions,place_of_origin,description,image_id,thumbnail,classification_title,style_title,department_title`
    );

    if (!response.ok) {
      throw new Error(`AIC API search failed: ${response.statusText}`);
    }

    const data: AICSearchResponse = await response.json();

    // Filter artworks that have images and match the artist name
    return (
      data.data?.filter(
        (artwork) =>
          artwork.image_id &&
          (artwork.artist_display
            ?.toLowerCase()
            .includes(artistName.toLowerCase()) ||
            artwork.artist_title
              ?.toLowerCase()
              .includes(artistName.toLowerCase()))
      ) || []
    );
  } catch (error) {
    console.error('Error searching AIC artworks by artist:', error);
    return [];
  }
}

/**
 * Get artwork details by artwork ID
 */
export async function getAICArtwork(
  artworkId: number
): Promise<AICArtwork | null> {
  try {
    const response = await fetch(
      `${AIC_API_BASE}/artworks/${artworkId}?fields=id,title,artist_display,artist_title,date_display,date_start,date_end,medium_display,dimensions,place_of_origin,description,image_id,thumbnail,classification_title,style_title,department_title`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`AIC API get artwork failed: ${response.statusText}`);
    }

    const data: { data: AICArtwork } = await response.json();

    // Only return artworks with images
    if (!data.data.image_id) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching AIC artwork ${artworkId}:`, error);
    return null;
  }
}

/**
 * Get multiple artworks by their IDs
 */
export async function getAICArtworks(
  artworkIds: number[]
): Promise<AICArtwork[]> {
  const artworks = await Promise.all(artworkIds.map((id) => getAICArtwork(id)));

  return artworks.filter((artwork): artwork is AICArtwork => artwork !== null);
}

/**
 * Transform AIC API artwork to our Artwork type
 */
export function transformAICArtworkToArtwork(
  aicArtwork: AICArtwork,
  index: number = 0
): {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  medium: string;
  year: number;
  dimensions?: string;
} {
  // Construct IIIF image URL
  const imageUrl = getAICImageUrl(aicArtwork.image_id);

  // Extract year from date_start or date_display
  let year = 0;
  if (aicArtwork.date_start) {
    year = aicArtwork.date_start;
  } else if (aicArtwork.date_display) {
    const yearMatch = aicArtwork.date_display.match(/\d{4}/);
    if (yearMatch) {
      year = parseInt(yearMatch[0], 10);
    }
  }

  // Create description from available metadata
  const descriptionParts: string[] = [];
  if (aicArtwork.place_of_origin)
    descriptionParts.push(aicArtwork.place_of_origin);
  if (aicArtwork.style_title) descriptionParts.push(aicArtwork.style_title);
  if (aicArtwork.classification_title)
    descriptionParts.push(aicArtwork.classification_title);
  if (aicArtwork.department_title)
    descriptionParts.push(aicArtwork.department_title);

  const description =
    descriptionParts.length > 0
      ? descriptionParts.join(', ')
      : aicArtwork.description ||
        aicArtwork.title ||
        'Artwork from The Art Institute of Chicago';

  return {
    id: `aic-${aicArtwork.id}-${index}`,
    title: aicArtwork.title || 'Untitled',
    imageUrl,
    description,
    medium: aicArtwork.medium_display || 'Unknown',
    year,
    dimensions: aicArtwork.dimensions || undefined,
  };
}

// Legacy function names for backward compatibility (aliases)
export const searchMetObjects = searchAICArtworks;
export const getMetObject = getAICArtwork;
export const getMetObjects = getAICArtworks;
export const transformMetObjectToArtwork = transformAICArtworkToArtwork;
