import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import products from '../data/products';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  useEffect(() => {
    // Find product by ID
    const productId = parseInt(id);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value < 1 ? 1 : value);
  };
  
  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      addToCart(product, quantity);
      
      // Show success animation
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    }
  };
  
  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/catalog" className="btn">Back to Catalog</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / 
          <Link to="/catalog">Catalog</Link> / 
          {product.name}
        </div>
        
        <div className="product-detail">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {Array(5).fill().map((_, i) => (
                  <span 
                    key={i} 
                    className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="review-count">{product.reviews} reviews</span>
            </div>
            
            <div className="product-price">${product.price.toFixed(2)}</div>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span className={`meta-value ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <div className="add-to-cart">
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                />
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
              
              <button 
                className={`btn add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding || !product.inStock}
              >
                {isAdding ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .product-detail-page {
          padding: var(--spacing-10) 0;
        }
        
        .breadcrumbs {
          margin-bottom: var(--spacing-6);
          color: var(--color-gray-500);
        }
        
        .breadcrumbs a {
          color: var(--color-gray-600);
          margin: 0 var(--spacing-2);
        }
        
        .breadcrumbs a:first-child {
          margin-left: 0;
        }
        
        .product-detail {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-8);
        }
        
        .product-image {
          height: 500px;
          overflow: hidden;
          border-radius: var(--radius-lg);
          background-color: white;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-name {
          margin-bottom: var(--spacing-4);
          font-size: 2rem;
        }
        
        .product-rating {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-4);
        }
        
        .stars {
          color: var(--color-gray-400);
          font-size: 1.25rem;
          margin-right: var(--spacing-2);
          letter-spacing: 2px;
        }
        
        .star.filled {
          color: var(--color-warning-500);
        }
        
        .review-count {
          color: var(--color-gray-600);
        }
        
        .product-price {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-primary-600);
          margin-bottom: var(--spacing-6);
        }
        
        .product-description {
          margin-bottom: var(--spacing-6);
          line-height: 1.6;
        }
        
        .product-meta {
          margin-bottom: var(--spacing-6);
          padding-bottom: var(--spacing-6);
          border-bottom: 1px solid var(--color-gray-200);
        }
        
        .meta-item {
          margin-bottom: var(--spacing-2);
        }
        
        .meta-label {
          font-weight: 600;
          margin-right: var(--spacing-2);
        }
        
        .in-stock {
          color: var(--color-success-500);
          font-weight: 500;
        }
        
        .out-of-stock {
          color: var(--color-error-500);
          font-weight: 500;
        }
        
        .add-to-cart {
          display: flex;
          gap: var(--spacing-4);
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        
        .quantity-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-gray-100);
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0;
          border-radius: 0;
        }
        
        .quantity-selector input {
          width: 60px;
          height: 40px;
          text-align: center;
          border: none;
          border-left: 1px solid var(--color-gray-300);
          border-right: 1px solid var(--color-gray-300);
          -moz-appearance: textfield;
        }
        
        .quantity-selector input::-webkit-outer-spin-button,
        .quantity-selector input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .add-to-cart-btn {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        
        .add-to-cart-btn.adding {
          background-color: var(--color-success-500);
        }
        
        .add-to-cart-btn.adding::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 1s infinite;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .product-not-found {
          text-align: center;
          padding: var(--spacing-10);
        }
        
        @media (max-width: 768px) {
          .product-detail {
            grid-template-columns: 1fr;
          }
          
          .product-image {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductDetailPage;