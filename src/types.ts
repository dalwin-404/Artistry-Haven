export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  medium: string;
  year: number;
  dimensions?: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  artworks: Artwork[];
}

