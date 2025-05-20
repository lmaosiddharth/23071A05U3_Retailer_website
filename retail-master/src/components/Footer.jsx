import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>StyleStore</h4>
            <p>Your destination for quality products and exceptional shopping experience.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalog">Catalog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/contact">Shipping Policy</Link></li>
              <li><Link to="/contact">Returns & Exchanges</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <ul className="social-links">
              <li><a href="#" aria-label="Facebook">Facebook</a></li>
              <li><a href="#" aria-label="Instagram">Instagram</a></li>
              <li><a href="#" aria-label="Twitter">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} StyleStore. All rights reserved.</p>
        </div>
      </div>
      
      <style jsx="true">{`
        .site-footer {
          background-color: var(--color-gray-800);
          color: var(--color-gray-200);
          padding: var(--spacing-10) 0 var(--spacing-4);
          margin-top: auto;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-8);
          margin-bottom: var(--spacing-8);
        }
        
        .footer-section h4 {
          color: white;
          margin-bottom: var(--spacing-4);
          font-size: 1.25rem;
        }
        
        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-section li {
          margin-bottom: var(--spacing-2);
        }
        
        .footer-section a {
          color: var(--color-gray-300);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .footer-section a:hover {
          color: white;
        }
        
        .social-links {
          display: flex;
          gap: var(--spacing-3);
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: var(--spacing-6);
          border-top: 1px solid var(--color-gray-700);
        }
        
        .footer-bottom p {
          margin: 0;
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-6);
          }
        }
        
        @media (max-width: 480px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;