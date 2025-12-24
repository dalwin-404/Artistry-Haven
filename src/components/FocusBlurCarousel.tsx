import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Artist, Artwork } from '../types';
import './FocusBlurCarousel.css';

interface FocusBlurCarouselProps {
  artworks: { artwork: Artwork; artist: Artist }[];
}

export default function FocusBlurCarousel({ artworks }: FocusBlurCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add global styles for Swiper classes
    const style = document.createElement('style');
    style.textContent = `
      .focus-blur-swiper .swiper-slide-active .carousel-art-card {
        opacity: 1 !important;
        filter: blur(0px) !important;
        transform: scale(1.1) !important;
      }
      .focus-blur-swiper .swiper-slide-active {
        z-index: 10;
      }
      .focus-blur-swiper .swiper-slide-prev .carousel-art-card,
      .focus-blur-swiper .swiper-slide-next .carousel-art-card {
        opacity: 0.5 !important;
        filter: blur(3px) !important;
        transform: scale(1.05) !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Start autoplay when gallery section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && swiperRef.current) {
            // Start or restart autoplay when section is visible
            swiperRef.current.autoplay?.start();
          } else if (!entry.isIntersecting && swiperRef.current) {
            // Optionally pause when not visible (optional - remove if you want it to keep playing)
            // swiperRef.current.autoplay?.stop();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  if (artworks.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="focus-blur-carousel-container">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Start autoplay immediately when swiper is initialized
          swiper.autoplay?.start();
        }}
        modules={[Autoplay]}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView="auto"
        spaceBetween={30}
        className="focus-blur-swiper"
        speed={800}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {artworks.map(({ artwork, artist }) => (
          <SwiperSlide key={artwork.id} className="focus-blur-slide">
            <div className="carousel-art-card">
              <div className="carousel-image-container">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="carousel-image"
                />
              </div>
              <div className="carousel-info">
                <h3 className="carousel-title">{artwork.title}</h3>
                <p className="carousel-artist">by {artist.name}</p>
                <p className="carousel-medium">{artwork.medium}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

