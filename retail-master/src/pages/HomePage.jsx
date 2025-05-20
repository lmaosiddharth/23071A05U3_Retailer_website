import { Link } from 'react-router-dom';
import products from '../data/products';

function HomePage() {
  // Get featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 3);
  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Style</h1>
            <p className="hero-subtitle">
              Explore our curated collection of premium products
            </p>
            <Link to="/catalog" className="btn hero-btn">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-item">
                <Link to={`/product/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </Link>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/catalog" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On all orders over $50</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⭐</div>
              <h3>Premium Quality</h3>
              <p>Handpicked products</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <h3>Secure Checkout</h3>
              <p>100% protected payments</p>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx="true">{`
        .hero {
          background-color: var(--color-primary-50);
          padding: var(--spacing-16) 0;
          position: relative;
          overflow: hidden;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 45%;
          background-image: url('https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
          background-size: cover;
          background-position: center left;
          opacity: 0.85;
        }
        
        .hero-content {
          max-width: 600px;
          position: relative;
          z-index: 1;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: var(--spacing-4);
          color: var(--color-primary-700);
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-8);
          color: var(--color-gray-700);
        }
        
        .hero-btn {
          font-size: 1.125rem;
          padding: var(--spacing-4) var(--spacing-8);
        }
        
        .section-title {
          text-align: center;
          margin-bottom: var(--spacing-10);
          font-size: 2rem;
          color: var(--color-primary-700);
        }
        
        .featured-products {
          padding: var(--spacing-16) 0;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-6);
        }
        
        .product-item {
          background-color: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .product-item a {
          display: block;
          color: inherit;
          text-decoration: none;
        }
        
        .product-image {
          height: 240px;
          overflow: hidden;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .product-item:hover .product-image img {
          transform: scale(1.05);
        }
        
        .product-name {
          padding: var(--spacing-4) var(--spacing-4) var(--spacing-2);
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        .product-price {
          padding: 0 var(--spacing-4) var(--spacing-4);
          font-weight: 600;
          color: var(--color-primary-500);
        }
        
        .view-all {
          margin-top: var(--spacing-10);
          text-align: center;
        }
        
        .benefits {
          background-color: white;
          padding: var(--spacing-16) 0;
          border-top: 1px solid var(--color-gray-200);
          border-bottom: 1px solid var(--color-gray-200);
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-8);
        }
        
        .benefit-item {
          text-align: center;
        }
        
        .benefit-icon {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-4);
        }
        
        .benefit-item h3 {
          margin-bottom: var(--spacing-2);
          font-size: 1.125rem;
        }
        
        .benefit-item p {
          color: var(--color-gray-600);
          font-size: 0.9rem;
        }
        
        @media (max-width: 992px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: var(--spacing-10);
          }
        }
        
        @media (max-width: 768px) {
          .hero::before {
            width: 100%;
            height: 100%;
            opacity: 0.15;
          }
          
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .products-grid {
            grid-template-columns: 1fr;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;