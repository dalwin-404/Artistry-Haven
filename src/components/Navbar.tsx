import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import './Navbar.css';
import artistryHavenLogo from '../assets/artistryHavenLogo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems] = useState(3); // Placeholder for cart items count
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSearchClick = () => {
    setSearchOverlayOpen(true);
  };

  const handleCloseSearch = () => {
    setSearchOverlayOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
    // Example: navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  // Handle ESC key to close search overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOverlayOpen) {
        handleCloseSearch();
      }
    };

    if (searchOverlayOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Focus on input when overlay opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [searchOverlayOpen]);

  const handleShopClick = () => {
    // TODO: Navigate to shop page
    // Example: navigate('/products');
    console.log('Shop clicked');
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

        {/* Right: Icons */}
        <div className="navbar-actions">
          <button 
            className="navbar-icon-btn"
            onClick={handleSearchClick}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <button 
            className="navbar-icon-btn navbar-shop-btn"
            onClick={handleShopClick}
            aria-label="Shop"
          >
            <ShoppingBag size={20} />
            {cartItems > 0 && (
              <span className="navbar-badge">{cartItems}</span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="navbar-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-Screen Search Overlay */}
      <div 
        className={`search-overlay ${searchOverlayOpen ? 'search-overlay-open' : ''}`}
        onClick={handleCloseSearch}
      >
        <div 
          className="search-overlay-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="search-overlay-header">
            <h2 className="search-overlay-title">Search</h2>
            <button 
              className="search-overlay-close"
              onClick={handleCloseSearch}
              aria-label="Close search"
            >
              <X size={28} />
            </button>
          </div>
          
          <form className="search-overlay-form" onSubmit={handleSearchSubmit}>
            <div className="search-overlay-input-wrapper">
              <Search size={24} className="search-overlay-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="search-overlay-input"
                placeholder="Search artworks, artists, exhibitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <button 
              type="submit" 
              className="search-overlay-submit"
              aria-label="Submit search"
            >
              Search
            </button>
          </form>

          {/* Search Suggestions/Results Placeholder */}
          {searchQuery && (
            <div className="search-overlay-results">
              <p className="search-overlay-hint">
                Search results for "{searchQuery}" will appear here
              </p>
              {/* TODO: Add search results component here */}
            </div>
          )}

          {!searchQuery && (
            <div className="search-overlay-suggestions">
              <p className="search-overlay-hint">Start typing to search...</p>
              {/* TODO: Add popular searches or suggestions here */}
            </div>
          )}
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

