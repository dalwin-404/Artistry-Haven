import './ContactSection.css';

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">
          Have questions or want to get in touch? We'd love to hear from you.
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>info@artistryhaven.com</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </section>
  );
}

