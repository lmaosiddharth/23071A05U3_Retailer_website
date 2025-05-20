import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            StyleStore
          </Link>
          
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalog">Catalog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {currentUser ? (
                <li className="user-menu">
                  <span>Hi, {currentUser.firstName}</span>
                  <ul className="dropdown">
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </ul>
                </li>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
              <li className="cart-icon">
                <Link to="/cart">
                  Cart
                  {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <style jsx="true">{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: white;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          padding: var(--spacing-4) 0;
        }
        
        .site-header.scrolled {
          box-shadow: var(--shadow-md);
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary-500);
        }
        
        .main-nav {
          display: flex;
        }
        
        .nav-list {
          display: flex;
          list-style: none;
          gap: var(--spacing-6);
          align-items: center;
          margin: 0;
        }
        
        .nav-list a {
          color: var(--color-gray-800);
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .nav-list a:hover {
          color: var(--color-primary-500);
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-menu span {
          cursor: pointer;
          display: flex;
          align-items: center;
          color: var(--color-gray-800);
        }
        
        .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          min-width: 150px;
          box-shadow: var(--shadow-md);
          border-radius: var(--radius-md);
          padding: var(--spacing-2);
          display: none;
          list-style: none;
        }
        
        .user-menu:hover .dropdown {
          display: block;
        }
        
        .dropdown li {
          padding: var(--spacing-2);
        }
        
        .dropdown button {
          width: 100%;
          text-align: left;
          padding: var(--spacing-2);
          color: var(--color-gray-800);
        }
        
        .dropdown button:hover {
          background-color: var(--color-gray-100);
        }
        
        .cart-icon {
          position: relative;
        }
        
        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: var(--color-accent-500);
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          height: 20px;
          width: 30px;
          padding: 0;
        }
        
        .menu-toggle span {
          height: 2px;
          width: 100%;
          background-color: var(--color-gray-800);
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }
          
          .main-nav {
            position: fixed;
            top: 0;
            right: 0;
            width: 70%;
            height: 100vh;
            background-color: white;
            box-shadow: var(--shadow-lg);
            padding: var(--spacing-8);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1000;
          }
          
          .main-nav.open {
            transform: translateX(0);
          }
          
          .nav-list {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-4);
          }
          
          .user-menu {
            margin-top: var(--spacing-6);
          }
          
          .dropdown {
            position: static;
            display: block;
            box-shadow: none;
            margin-top: var(--spacing-2);
            margin-left: var(--spacing-4);
          }
        }
      `}</style>
    </header>
  );
}

export default Header;