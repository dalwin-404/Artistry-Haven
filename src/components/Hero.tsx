import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';
import { searchAICArtworks, getAICImageUrl } from '../services/metApi';

// Placeholder images - Replace with actual artwork images from API
const defaultHeroImages = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=1600&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=1600&fit=crop',
  'https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&h=1600&fit=crop',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=1600&fit=crop',
];

export default function Hero() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(defaultHeroImages);

  // Fetch high-quality artwork images from AIC API for slideshow
  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const artworks = await searchAICArtworks('', 4);
        const imageUrls = artworks
          .filter((artwork) => artwork.image_id)
          .slice(0, 4)
          .map((artwork) => {
            // Construct IIIF image URL for high quality (1200px width)
            return getAICImageUrl(artwork.image_id, 1200);
          });
        
        if (imageUrls.length >= 3) {
          setHeroImages(imageUrls);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
        // Fallback to default images
      }
    }

    fetchHeroImages();
  }, []);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleStartCollecting = () => {
    navigate('/gallery');
  };

  const handleApplyAsArtist = () => {
    navigate('/apply');
  };

  return (
    <section className="hero-split">
      <div className="hero-split-container">
        {/* Left Column - Content */}
        <div className="hero-split-content">
          <motion.h1
            className="hero-split-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Discover Art That Speaks.
          </motion.h1>
          
          <motion.p
            className="hero-split-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Join a global community of creators and collectors.
          </motion.p>

          <motion.div
            className="hero-split-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <button
              className="hero-cta-primary"
              onClick={handleStartCollecting}
            >
              Start Collecting
            </button>
            <button
              className="hero-cta-secondary"
              onClick={handleApplyAsArtist}
            >
              Apply as Artist
            </button>
          </motion.div>
        </div>

        {/* Right Column - Visual Slideshow */}
        <div className="hero-split-visual">
          <div className="hero-split-blob"></div>
          <div className="hero-split-image-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={heroImages[currentImageIndex]}
                alt={`Artwork ${currentImageIndex + 1}`}
                className="hero-split-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
