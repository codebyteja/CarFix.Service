import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate submission
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset notification after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="section" style={{ marginTop: 'var(--header-height)' }}>
      <div className="contact-layout">
        <div className="contact-info">
          <span className="eyebrow">Booking</span>
          <h2 className="contact-title">Book a Service</h2>
          <p className="contact-subtext">
            Schedule your alignment, diagnostic run, wash, or custom tuning details. Submit your request below, and our technicians will confirm your booking within 24 hours.
          </p>

          <div className="contact-details">
            <div className="contact-meta-item">
              <span className="contact-meta-label">Direct Line</span>
              <span className="contact-meta-val">contact@carfix.example</span>
            </div>

            <div className="contact-meta-item">
              <span className="contact-meta-label">Connect</span>
              <div className="contact-social-grid">
                <a
                  href="mailto:contact@carfix.example"
                  className="social-link"
                  title="Email"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://instagram.com/carfix.performance"
                  className="social-link"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a
                  href="https://linkedin.com/company/carfix-performance"
                  className="social-link"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a
                  href="https://github.com/carfix-performance"
                  className="social-link"
                  title="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          {isSubmitted && (
            <div className="form-success-msg">
              <Check size={16} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
              Message sent successfully.
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitted}
              placeholder="e.g. Alexander Vance"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitted}
              placeholder="alex@domain.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">Message / Specifications</label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              required
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitted}
              placeholder="Detail your request..."
            />
          </div>

          <button type="submit" className="form-button" disabled={isSubmitted}>
            {isSubmitted ? 'Sent' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
