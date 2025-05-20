import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  
  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h2>Get in Touch</h2>
              <p>
                Have a question about our products or services? We're here to help.
                Fill out the form, and we'll get back to you as soon as possible.
              </p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-details">
                    <h3>Address</h3>
                    <p>123 Fashion Avenue, New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-details">
                    <h3>Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">✉️</div>
                  <div className="method-details">
                    <h3>Email</h3>
                    <p>support@stylestore.com</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">⏰</div>
                  <div className="method-details">
                    <h3>Hours</h3>
                    <p>Monday - Friday: 9am - 6pm</p>
                    <p>Saturday: 10am - 4pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {submitted ? (
              <div className="success-message slide-in">
                <h2>Thank You!</h2>
                <p>
                  Your message has been sent successfully. We'll get back to you soon.
                </p>
                <button 
                  className="btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="error">{errors.name}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <div className="error">{errors.subject}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <div className="error">{errors.message}</div>}
                </div>
                
                <button 
                  type="submit" 
                  className="btn submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .contact-page {
          padding: var(--spacing-10) 0;
        }
        
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-8);
          margin-top: var(--spacing-8);
        }
        
        .info-card {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: var(--spacing-6);
          height: 100%;
        }
        
        .info-card h2 {
          margin-bottom: var(--spacing-4);
          color: var(--color-primary-700);
        }
        
        .info-card p {
          color: var(--color-gray-600);
          margin-bottom: var(--spacing-6);
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }
        
        .contact-method {
          display: flex;
          gap: var(--spacing-4);
        }
        
        .method-icon {
          font-size: 1.5rem;
          color: var(--color-primary-500);
        }
        
        .method-details h3 {
          font-size: 1rem;
          margin-bottom: var(--spacing-1);
        }
        
        .method-details p {
          margin-bottom: var(--spacing-1);
          color: var(--color-gray-700);
        }
        
        .contact-form-container {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: var(--spacing-6);
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }
        
        textarea.form-control {
          resize: vertical;
          min-height: 120px;
        }
        
        .submit-btn {
          margin-top: var(--spacing-2);
        }
        
        .success-message {
          text-align: center;
          padding: var(--spacing-10) var(--spacing-4);
        }
        
        .success-message h2 {
          color: var(--color-success-500);
          margin-bottom: var(--spacing-4);
        }
        
        .success-message p {
          margin-bottom: var(--spacing-6);
          color: var(--color-gray-600);
        }
        
        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactPage;