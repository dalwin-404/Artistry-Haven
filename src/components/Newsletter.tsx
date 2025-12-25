import { useState, FormEvent } from 'react';
import { Mail } from 'lucide-react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate subscription success
    setIsSubscribed(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-headline">The Artistry Edit</h2>
          <p className="newsletter-subtext">
            Join our global community of collectors. Receive weekly curation and
            exhibition alerts.
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-wrapper">
              <Mail size={20} className="newsletter-icon" />
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubscribed}
              />
            </div>
            <button
              type="submit"
              className={`newsletter-button ${isSubscribed ? 'subscribed' : ''}`}
              disabled={isSubscribed}
            >
              {isSubscribed ? 'Welcome to the circle' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
