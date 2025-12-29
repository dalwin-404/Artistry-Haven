import { useState } from 'react';
import { ShieldCheck, TrendingUp, Sun, ArrowRight } from 'lucide-react';
import './Learn.css';

interface GlossaryTerm {
  term: string;
  definition: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Giclée',
    definition: 'A high-quality digital print made using an inkjet printer. The term is derived from the French word "gicler" meaning "to squirt or spray." Giclée prints are often used for fine art reproductions and are known for their archival quality and color accuracy.',
  },
  {
    term: 'Limited Edition',
    definition: 'A set of identical prints or artworks produced in a predetermined, limited quantity. Each piece is numbered (e.g., "1/100") and once the edition is sold out, no more will be produced. Limited editions often increase in value over time due to their scarcity.',
  },
  {
    term: 'Impasto',
    definition: 'A painting technique where paint is applied thickly, creating visible brushstrokes or palette knife marks that stand out from the canvas surface. This technique adds texture and dimension to the artwork, famously used by artists like Vincent van Gogh.',
  },
  {
    term: 'Triptych',
    definition: 'A work of art divided into three sections or panels, typically hinged together. The central panel is usually the largest, with two smaller side panels. Triptychs have been used since the Middle Ages for altarpieces and continue to be popular in contemporary art.',
  },
  {
    term: 'Provenance',
    definition: 'The documented history of ownership of an artwork, tracing its journey from the artist to the current owner. Provenance is crucial for authentication, establishing authenticity, and can significantly impact the value of a piece.',
  },
];

export default function Learn() {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const toggleTerm = (term: string) => {
    setExpandedTerm(expandedTerm === term ? null : term);
  };

  return (
    <div className="learn">
      {/* Hero Section */}
      <section className="learn-hero">
        <div className="learn-hero-container">
          <h1 className="learn-hero-title">The Collector's Handbook</h1>
          <p className="learn-hero-subtitle">
            Curated insights on acquiring, maintaining, and understanding fine art.
          </p>
        </div>
        <div className="learn-hero-divider"></div>
      </section>

      {/* Featured Article */}
      <section className="learn-featured">
        <div className="learn-featured-container">
          <div className="learn-featured-content">
            <div className="learn-featured-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop"
                alt="Modern living room with art"
                className="learn-featured-image"
              />
            </div>
            <div className="learn-featured-text">
              <span className="learn-featured-label">Featured Article</span>
              <h2 className="learn-featured-title">
                A Beginner's Guide to Buying Your First Original
              </h2>
              <p className="learn-featured-description">
                Embarking on your journey as an art collector can be both exciting and
                overwhelming. This comprehensive guide walks you through the essential
                steps—from understanding your personal taste to navigating galleries,
                evaluating authenticity, and making your first purchase with confidence.
              </p>
              <a href="#" className="learn-featured-cta">
                Read Article
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Grid */}
      <section className="learn-topics">
        <div className="learn-topics-container">
          <div className="learn-topics-grid">
            {/* Card 1: Investment */}
            <div className="learn-topic-card">
              <div className="learn-topic-icon-wrapper">
                <TrendingUp size={32} className="learn-topic-icon" />
              </div>
              <h3 className="learn-topic-title">Art as an Asset</h3>
              <p className="learn-topic-text">
                Understanding valuation and market trends.
              </p>
            </div>

            {/* Card 2: Preservation */}
            <div className="learn-topic-card">
              <div className="learn-topic-icon-wrapper">
                <Sun size={32} className="learn-topic-icon" />
              </div>
              <h3 className="learn-topic-title">Caring for Canvas</h3>
              <p className="learn-topic-text">
                How lighting and humidity affect oil paintings.
              </p>
            </div>

            {/* Card 3: Authenticity */}
            <div className="learn-topic-card">
              <div className="learn-topic-icon-wrapper">
                <ShieldCheck size={32} className="learn-topic-icon" />
              </div>
              <h3 className="learn-topic-title">Provenance Explained</h3>
              <p className="learn-topic-text">
                Why the paper trail matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Glossary */}
      <section className="learn-glossary">
        <div className="learn-glossary-container">
          <h2 className="learn-glossary-title">Essential Terminology</h2>
          <div className="learn-glossary-list">
            {glossaryTerms.map((item) => (
              <div
                key={item.term}
                className={`learn-glossary-item ${
                  expandedTerm === item.term ? 'expanded' : ''
                }`}
              >
                <button
                  className="learn-glossary-term"
                  onClick={() => toggleTerm(item.term)}
                  aria-expanded={expandedTerm === item.term}
                >
                  <span className="learn-glossary-term-text">{item.term}</span>
                  <span className="learn-glossary-arrow">
                    <ArrowRight
                      size={20}
                      className={`learn-glossary-arrow-icon ${
                        expandedTerm === item.term ? 'rotated' : ''
                      }`}
                    />
                  </span>
                </button>
                {expandedTerm === item.term && (
                  <div className="learn-glossary-definition">
                    <p>{item.definition}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

