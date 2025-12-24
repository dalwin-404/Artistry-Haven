import { Artist } from '../types';
import ElasticAccordion from './ElasticAccordion';
import './Gallery.css';

interface GalleryProps {
  artists: Artist[];
}

export default function Gallery({ artists }: GalleryProps) {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-header">
        <h2 className="gallery-title">Art Gallery</h2>
        <p className="gallery-subtitle">Discover stunning artworks from talented artists around the world</p>
      </div>

      <ElasticAccordion artists={artists} />
    </section>
  );
}

