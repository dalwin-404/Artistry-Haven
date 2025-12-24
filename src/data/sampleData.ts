import { Artist } from '../types';

export const sampleArtists: Artist[] = [
  {
    id: '1',
    name: 'Elena Martinez',
    bio: 'Contemporary painter specializing in abstract expressionism and vibrant color compositions.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    artworks: [
      {
        id: '1-1',
        title: 'Cosmic Dreams',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop',
        description: 'An exploration of color and movement in abstract form.',
        medium: 'Acrylic on Canvas',
        year: 2024,
        dimensions: '36" x 48"'
      },
      {
        id: '1-2',
        title: 'Urban Symphony',
        imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=800&fit=crop',
        description: 'A vibrant representation of city life through bold strokes.',
        medium: 'Oil on Canvas',
        year: 2023,
        dimensions: '24" x 30"'
      },
      {
        id: '1-3',
        title: 'Ocean Whispers',
        imageUrl: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop',
        description: 'Serene blues and greens capturing the essence of the sea.',
        medium: 'Watercolor',
        year: 2024,
        dimensions: '18" x 24"'
      }
    ]
  },
  {
    id: '2',
    name: 'James Chen',
    bio: 'Digital artist and photographer pushing boundaries between reality and imagination.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    artworks: [
      {
        id: '2-1',
        title: 'Neon Nights',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop',
        description: 'A cyberpunk-inspired digital composition.',
        medium: 'Digital Art',
        year: 2024,
        dimensions: '4000 x 4000px'
      },
      {
        id: '2-2',
        title: 'Metropolis',
        imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=800&fit=crop',
        description: 'Architectural photography meeting digital manipulation.',
        medium: 'Mixed Media - Photography & Digital',
        year: 2023,
        dimensions: '3000 x 3000px'
      },
      {
        id: '2-3',
        title: 'Futuristic Visions',
        imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=800&fit=crop',
        description: 'Imagining tomorrow through today\'s lens.',
        medium: 'Digital Art',
        year: 2024,
        dimensions: '5000 x 5000px'
      }
    ]
  },
  {
    id: '3',
    name: 'Sophie Anderson',
    bio: 'Sculptor and mixed media artist exploring the intersection of nature and human experience.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    artworks: [
      {
        id: '3-1',
        title: 'Botanical Dreams',
        imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=800&fit=crop',
        description: 'A celebration of nature\'s intricate beauty.',
        medium: 'Mixed Media',
        year: 2024,
        dimensions: '20" x 16"'
      },
      {
        id: '3-2',
        title: 'Eternal Spring',
        imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=800&fit=crop',
        description: 'Floral composition in vibrant pastels.',
        medium: 'Oil Pastel',
        year: 2023,
        dimensions: '14" x 18"'
      },
      {
        id: '3-3',
        title: 'Garden Symphony',
        imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&h=800&fit=crop',
        description: 'An ode to the colors of the garden.',
        medium: 'Watercolor & Ink',
        year: 2024,
        dimensions: '16" x 20"'
      }
    ]
  },
  {
    id: '4',
    name: 'Marcus Thompson',
    bio: 'Street artist and muralist bringing color and life to urban landscapes.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    artworks: [
      {
        id: '4-1',
        title: 'City Canvas',
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
        description: 'Bold graffiti meets fine art.',
        medium: 'Spray Paint on Wall',
        year: 2024,
        dimensions: '12ft x 16ft'
      },
      {
        id: '4-2',
        title: 'Street Pulse',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=800&fit=crop',
        description: 'The rhythm of the streets captured in paint.',
        medium: 'Acrylic & Spray Paint',
        year: 2023,
        dimensions: '10ft x 12ft'
      },
      {
        id: '4-3',
        title: 'Urban Bloom',
        imageUrl: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=800&fit=crop',
        description: 'Nature reclaiming the urban space.',
        medium: 'Mixed Media Mural',
        year: 2024,
        dimensions: '15ft x 20ft'
      }
    ]
  },
  {
    id: '5',
    name: 'Isabella Rossi',
    bio: 'Classical painter with a modern twist, specializing in portraiture and figurative work.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    artworks: [
      {
        id: '5-1',
        title: 'Portrait of Resilience',
        imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=800&fit=crop',
        description: 'A powerful representation of human strength.',
        medium: 'Oil on Canvas',
        year: 2024,
        dimensions: '30" x 40"'
      },
      {
        id: '5-2',
        title: 'The Thinker',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop',
        description: 'Contemplative portrait in warm tones.',
        medium: 'Charcoal & Pastel',
        year: 2023,
        dimensions: '22" x 28"'
      },
      {
        id: '5-3',
        title: 'Solitude',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop',
        description: 'Capturing quiet moments of reflection.',
        medium: 'Oil on Canvas',
        year: 2024,
        dimensions: '24" x 32"'
      }
    ]
  }
];

