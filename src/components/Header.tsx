import { useState } from 'react';
import './Header.css';
import artistryHavenLogo from '../assets/artistryHavenLogo.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu after navigation
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <a href="/" className="logo-link" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}>
            <img 
              src={artistryHavenLogo} 
              alt="Artistry Haven" 
              className="logo-image"
            />
          </a>
        </div>

        {/* Navigation */}
        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a 
            href="#gallery" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'gallery')}
          >
            Gallery
          </a>
          
          <a 
            href="#artists" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'artists')}
          >
            Artists
          </a>

          <a 
            href="#about" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About
          </a>
        </nav>

        {/* Right side actions */}
        <div className={`header-actions ${mobileMenuOpen ? 'actions-open' : ''}`}>
          <a href="#contact" className="action-link" onClick={(e) => {
            e.preventDefault();
            const contactElement = document.getElementById('contact');
            if (contactElement) {
              contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setMobileMenuOpen(false);
          }}>
            Contact Us
          </a>
          <a href="#support" className="action-link" onClick={(e) => {
            e.preventDefault();
            const supportElement = document.getElementById('support') || document.getElementById('about');
            if (supportElement) {
              supportElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setMobileMenuOpen(false);
          }}>
            Support
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn" 
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
