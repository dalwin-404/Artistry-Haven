import { useState } from 'react';
import './Newsletter.css';
import footerIllustration from '../assets/footer/undraw_artist-at-work_yos7.svg';

// Mail icon component
const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 6L12 13L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <div className="newsletter-card">
      <div className="newsletter-image-column">
        <img 
          src={footerIllustration} 
          alt="Artist at work illustration" 
          className="newsletter-image"
        />
      </div>
      <div className="newsletter-content-column">
        <div className="newsletter-text">
          <h3 className="newsletter-title">
            Subscribe to our newsletter to receive the latest art updates and featured artists.
          </h3>
          <p className="newsletter-subtitle">
            Join thousands of art enthusiasts and stay connected with the creative world.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-wrapper">
            <div className="newsletter-input-icon">
              <MailIcon />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
