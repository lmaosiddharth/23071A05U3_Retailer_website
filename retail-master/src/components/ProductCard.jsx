import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-category">{product.category}</div>
          <div className="product-rating">
            <span className="stars">
              {Array(5).fill().map((_, i) => (
                <span 
                  key={i} 
                  className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
            </span>
            <span className="reviews">({product.reviews})</span>
          </div>
          <div className="product-price">${product.price.toFixed(2)}</div>
        </div>
      </Link>
      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      
      <style jsx="true">{`
        .product-card {
          background-color: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .product-link {
          display: block;
          color: inherit;
          text-decoration: none;
          flex: 1;
        }
        
        .product-image {
          height: 200px;
          overflow: hidden;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .product-card:hover .product-image img {
          transform: scale(1.05);
        }
        
        .product-info {
          padding: var(--spacing-4);
        }
        
        .product-name {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--spacing-2);
          color: var(--color-gray-900);
        }
        
        .product-category {
          color: var(--color-gray-500);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-2);
        }
        
        .product-rating {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-2);
          font-size: 0.875rem;
        }
        
        .stars {
          color: var(--color-gray-400);
          margin-right: var(--spacing-2);
          letter-spacing: 1px;
        }
        
        .star.filled {
          color: var(--color-warning-500);
        }
        
        .reviews {
          color: var(--color-gray-500);
        }
        
        .product-price {
          font-weight: 600;
          font-size: 1.125rem;
          color: var(--color-primary-500);
          margin-top: var(--spacing-2);
        }
        
        .add-to-cart-btn {
          background-color: var(--color-primary-500);
          color: white;
          width: 100%;
          padding: var(--spacing-3);
          border: none;
          border-radius: 0;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }
        
        .add-to-cart-btn:hover {
          background-color: var(--color-primary-600);
        }
      `}</style>
    </div>
  );
}

export default ProductCard;