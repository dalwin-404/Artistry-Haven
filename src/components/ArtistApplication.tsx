import { useState, FormEvent } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './ArtistApplication.css';

interface FormData {
  fullName: string;
  email: string;
  portfolioUrl: string;
  artistStatement: string;
  sampleWorks: FileList | null;
}

export default function ArtistApplication() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    portfolioUrl: '',
    artistStatement: '',
    sampleWorks: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      sampleWorks: e.target.files,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        portfolioUrl: '',
        artistStatement: '',
        sampleWorks: null,
      });
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="artist-application">
      <div className="artist-application-container">
        {/* Left Column: The Pitch */}
        <div className="artist-application-pitch">
          <div className="artist-application-pitch-content">
            <h1 className="artist-application-title">
              Share your vision with the world.
            </h1>

            <ul className="artist-application-benefits">
              <li className="artist-application-benefit">
                <CheckCircle size={24} className="artist-application-check-icon" />
                <span>Global Collector Base</span>
              </li>
              <li className="artist-application-benefit">
                <CheckCircle size={24} className="artist-application-check-icon" />
                <span>Zero Listing Fees</span>
              </li>
              <li className="artist-application-benefit">
                <CheckCircle size={24} className="artist-application-check-icon" />
                <span>Curated Exposure</span>
              </li>
              <li className="artist-application-benefit">
                <CheckCircle size={24} className="artist-application-check-icon" />
                <span>Professional Support</span>
              </li>
              <li className="artist-application-benefit">
                <CheckCircle size={24} className="artist-application-check-icon" />
                <span>Secure Transactions</span>
              </li>
            </ul>

            <blockquote className="artist-application-testimonial">
              <p className="artist-application-testimonial-text">
                "Joining Artistry Haven transformed my career. The platform
                connected me with collectors I never would have reached on my
                own, and the zero-fee structure means I keep more of what I
                earn."
              </p>
              <footer className="artist-application-testimonial-author">
                — Sarah Chen, Visual Artist
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="artist-application-form-section">
          <div className="artist-application-form-wrapper">
            {isSuccess ? (
              <div className="artist-application-success">
                <CheckCircle size={64} className="artist-application-success-icon" />
                <h2 className="artist-application-success-title">
                  Thank you!
                </h2>
                <p className="artist-application-success-message">
                  Our curators will review your portfolio and get back to you
                  within 5-7 business days.
                </p>
              </div>
            ) : (
              <form
                className="artist-application-form"
                onSubmit={handleSubmit}
              >
                <h2 className="artist-application-form-title">
                  Apply to Join
                </h2>

                {/* Full Name & Email (Side-by-side) */}
                <div className="artist-application-form-row">
                  <div className="artist-application-form-group">
                    <label
                      htmlFor="fullName"
                      className="artist-application-label"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="artist-application-input"
                    />
                  </div>

                  <div className="artist-application-form-group">
                    <label
                      htmlFor="email"
                      className="artist-application-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="artist-application-input"
                    />
                  </div>
                </div>

                {/* Portfolio URL */}
                <div className="artist-application-form-group">
                  <label
                    htmlFor="portfolioUrl"
                    className="artist-application-label"
                  >
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    id="portfolioUrl"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com or Instagram handle"
                    required
                    className="artist-application-input"
                  />
                </div>

                {/* Artist Statement */}
                <div className="artist-application-form-group">
                  <label
                    htmlFor="artistStatement"
                    className="artist-application-label"
                  >
                    Artist Statement
                  </label>
                  <textarea
                    id="artistStatement"
                    name="artistStatement"
                    value={formData.artistStatement}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="artist-application-textarea"
                    placeholder="Tell us about your artistic practice, inspiration, and what makes your work unique..."
                  />
                </div>

                {/* Upload Sample Works */}
                <div className="artist-application-form-group">
                  <label
                    htmlFor="sampleWorks"
                    className="artist-application-label"
                  >
                    Upload 3 Sample Works
                  </label>
                  <div className="artist-application-file-upload">
                    <input
                      type="file"
                      id="sampleWorks"
                      name="sampleWorks"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                      required
                      className="artist-application-file-input"
                    />
                    <div className="artist-application-file-upload-content">
                      <p className="artist-application-file-upload-text">
                        {formData.sampleWorks && formData.sampleWorks.length > 0
                          ? `${formData.sampleWorks.length} file(s) selected`
                          : 'Click to upload or drag and drop'}
                      </p>
                      <p className="artist-application-file-upload-hint">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="artist-application-submit-btn"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                  {!isSubmitting && (
                    <ArrowRight
                      size={20}
                      className="artist-application-submit-arrow"
                    />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

