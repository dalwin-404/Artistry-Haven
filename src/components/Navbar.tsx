import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import artistryHavenLogo from '../assets/artistryHavenLogo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Brand Logo */}
        <div className="navbar-logo">
          <Link 
            to="/" 
            className="navbar-logo-link"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          >
            <img 
              src={artistryHavenLogo} 
              alt="Artistry Haven" 
              className="navbar-logo-image"
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="navbar-nav">
          <a 
            href="/gallery" 
            className="navbar-link"
            onClick={(e) => handleNavClick(e, '/gallery')}
          >
            Gallery
          </a>
          <a 
            href="/artists" 
            className="navbar-link"
            onClick={(e) => handleNavClick(e, '/artists')}
          >
            Artists
          </a>
          <a 
            href="/exhibitions" 
            className="navbar-link"
            onClick={(e) => handleNavClick(e, '/exhibitions')}
          >
            Exhibitions
          </a>
          <a 
            href="/learn" 
            className="navbar-link"
            onClick={(e) => handleNavClick(e, '/learn')}
          >
            Learn
          </a>
        </nav>

        {/* Right: Mobile Menu Button */}
        <div className="navbar-actions">
          <button 
            className="navbar-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="navbar-mobile-nav">
          <a 
            href="/gallery" 
            className="navbar-mobile-link"
            onClick={(e) => handleNavClick(e, '/gallery')}
          >
            Gallery
          </a>
          <a 
            href="/artists" 
            className="navbar-mobile-link"
            onClick={(e) => handleNavClick(e, '/artists')}
          >
            Artists
          </a>
          <a 
            href="/exhibitions" 
            className="navbar-mobile-link"
            onClick={(e) => handleNavClick(e, '/exhibitions')}
          >
            Exhibitions
          </a>
          <a 
            href="/learn" 
            className="navbar-mobile-link"
            onClick={(e) => handleNavClick(e, '/learn')}
          >
            Learn
          </a>
        </nav>
      </div>
    </nav>
  );
}

