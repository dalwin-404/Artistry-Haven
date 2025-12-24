import './TrustedBy.css';

// Import brand logos
import ArtMajeur from '../assets/brands/ArtMajeur.svg';
import ArtStation from '../assets/brands/ArtStation.svg';
import exibart from '../assets/brands/exibart.png';
import iCanvas from '../assets/brands/iCanvas.png';
// @ts-ignore - Special character in filename
import JerrysArtarama from '../assets/brands/Jerry\'s Artarama.svg';
import SaatchiArt from '../assets/brands/Saatchi Art.svg';
import ugallery from '../assets/brands/ugallery.png';

const brandLogos = [
  { name: 'ArtMajeur', logo: ArtMajeur, type: 'svg' },
  { name: 'ArtStation', logo: ArtStation, type: 'svg' },
  { name: 'Exibart', logo: exibart, type: 'png' },
  { name: 'iCanvas', logo: iCanvas, type: 'png' },
  { name: 'Jerry\'s Artarama', logo: JerrysArtarama, type: 'svg' },
  { name: 'Saatchi Art', logo: SaatchiArt, type: 'svg' },
  { name: 'Ugallery', logo: ugallery, type: 'png' },
];

export default function TrustedBy() {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...brandLogos, ...brandLogos];

  return (
    <section className="trusted-by-section">
      {/* Top curved divider (concave) */}
      <div className="trusted-by-divider-top">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C240,40 480,40 720,40 C960,40 1200,40 1440,120 L1440,0 L0,0 Z"
            fill="#F3F4F6"
          />
        </svg>
      </div>

      <div className="trusted-by-container">
        <h2 className="trusted-by-heading">Trusted By</h2>
        <p className="trusted-by-subtitle">Leading art platforms and galleries worldwide</p>

        {/* Marquee container with fade edges */}
        <div className="trusted-by-marquee-wrapper">
          <div className="trusted-by-marquee">
            {duplicatedLogos.map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="trusted-by-logo-item">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="trusted-by-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom curved divider (convex) */}
      <div className="trusted-by-divider-bottom">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C240,80 480,80 720,80 C960,80 1200,80 1440,0 L1440,120 L0,120 Z"
            fill="#F3F4F6"
          />
        </svg>
      </div>
    </section>
  );
}

