import './Hero.css';
import videoBg from '../assets/video/video_background.mp4';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="video-wrapper">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoBg} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text-content">
            <h2 className="hero-headline">
              Showcasing Art to the World
            </h2>
            <p className="hero-subheadline">Ready to discover?</p>
          </div>
          {/* Call to Action Buttons */}
          <div className="hero-cta">
            <button className="cta-button cta-primary">Get started</button>
            <button className="cta-button cta-secondary">Browse Gallery</button>
          </div>
        </div>
      </div>
    </section>
  );
}

