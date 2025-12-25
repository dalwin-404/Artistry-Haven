import { Award, Globe, Heart } from 'lucide-react';
import './About.css';

export default function AboutSections() {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <h1 className="about-hero-title">Curating the Extraordinary.</h1>
          <p className="about-hero-subtext">
            Artistry Haven is where the digital age meets timeless beauty.
          </p>
        </div>
        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&h=400&fit=crop"
            alt="Museum interior"
            className="about-hero-banner"
          />
        </div>
      </section>

      {/* Our Values Grid */}
      <section className="about-values">
        <div className="about-values-container">
          <div className="about-values-grid">
            {/* Value 1: Authenticity */}
            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <Award size={40} className="about-value-icon" />
              </div>
              <h3 className="about-value-title">Authenticity</h3>
              <p className="about-value-text">
                Every piece is verified and original.
              </p>
            </div>

            {/* Value 2: Global Reach */}
            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <Globe size={40} className="about-value-icon" />
              </div>
              <h3 className="about-value-title">Global Reach</h3>
              <p className="about-value-text">
                Connecting artists from 40+ countries.
              </p>
            </div>

            {/* Value 3: Passion */}
            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <Heart size={40} className="about-value-icon" />
              </div>
              <h3 className="about-value-title">Passion</h3>
              <p className="about-value-text">
                Driven by a love for the creative process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="about-story">
        <div className="about-story-container">
          <div className="about-story-content">
            <div className="about-story-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=800&fit=crop"
                alt="Artist's hands working"
                className="about-story-image"
              />
            </div>
            <div className="about-story-text">
              <h2 className="about-story-title">Our Story</h2>
              <p className="about-story-description">
                We started with a simple idea: Art should be accessible, yet
                sacred. In a world where digital platforms often reduce art to
                mere commodities, Artistry Haven emerged as a sanctuary for
                genuine artistic expression.
              </p>
              <p className="about-story-description">
                Our platform bridges the gap between emerging talents and
                discerning collectors, creating a global marketplace that honors
                both the artist's vision and the collector's passion. Every
                piece tells a story, every transaction builds a connection, and
                every interaction celebrates the transformative power of art.
              </p>
              <p className="about-story-description">
                Today, we're proud to be a trusted home for artists and
                collectors worldwide, fostering a community where creativity
                thrives and masterpieces find their forever homes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

