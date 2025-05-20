import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleQuantityChange = (id, quantity) => {
    setIsUpdating(true);
    updateQuantity(id, quantity);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      setIsUpdating(false);
    }, 300);
  };
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/payment');
    } else {
      navigate('/login');
    }
  };
  
  // Calculate summary
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/catalog" className="btn">Browse Products</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <div className="cart-header-item product-col">Product</div>
                <div className="cart-header-item price-col">Price</div>
                <div className="cart-header-item quantity-col">Quantity</div>
                <div className="cart-header-item total-col">Total</div>
                <div className="cart-header-item action-col"></div>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="product-col">
                    <div className="product-info">
                      <div className="product-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="product-details">
                        <h3 className="product-name">{item.name}</h3>
                        <div className="product-category">{item.category}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="price-col">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="quantity-col">
                    <div className="quantity-selector">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={isUpdating}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={isUpdating}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="total-col">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <div className="action-col">
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <button 
                className="btn checkout-btn"
                onClick={handleCheckout}
              >
                {isAuthenticated ? 'Proceed to Payment' : 'Login to Checkout'}
              </button>
              
              <div className="continue-shopping">
                <Link to="/catalog">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx="true">{`
        .cart-page {
          padding: var(--spacing-10) 0;
        }
        
        .empty-cart {
          text-align: center;
          padding: var(--spacing-10) 0;
        }
        
        .empty-cart h2 {
          margin-bottom: var(--spacing-4);
        }
        
        .empty-cart p {
          margin-bottom: var(--spacing-6);
          color: var(--color-gray-600);
        }
        
        .cart-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-8);
        }
        
        .cart-items {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        
        .cart-header {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr 1fr 50px;
          padding: var(--spacing-4);
          background-color: var(--color-gray-100);
          font-weight: 600;
        }
        
        .cart-item {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr 1fr 50px;
          padding: var(--spacing-4);
          border-bottom: 1px solid var(--color-gray-200);
        }
        
        .product-info {
          display: flex;
          align-items: center;
        }
        
        .product-image {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-right: var(--spacing-4);
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-name {
          font-size: 1rem;
          margin-bottom: var(--spacing-1);
        }
        
        .product-category {
          font-size: 0.875rem;
          color: var(--color-gray-500);
        }
        
        .price-col, .total-col {
          display: flex;
          align-items: center;
          font-weight: 500;
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
        }
        
        .quantity-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          background-color: var(--color-gray-100);
          cursor: pointer;
        }
        
        .quantity {
          padding: 0 var(--spacing-3);
          font-weight: 500;
        }
        
        .remove-btn {
          color: var(--color-gray-400);
          font-size: 1rem;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        
        .remove-btn:hover {
          color: var(--color-error-500);
        }
        
        .cart-summary {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-6);
          height: fit-content;
        }
        
        .cart-summary h2 {
          margin-bottom: var(--spacing-6);
          padding-bottom: var(--spacing-4);
          border-bottom: 1px solid var(--color-gray-200);
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-4);
          color: var(--color-gray-700);
        }
        
        .summary-row.total {
          font-size: 1.25rem;
          font-weight: 600;
          margin: var(--spacing-4) 0 var(--spacing-6);
          padding-top: var(--spacing-4);
          border-top: 1px solid var(--color-gray-200);
          color: var(--color-gray-900);
        }
        
        .checkout-btn {
          width: 100%;
        }
        
        .continue-shopping {
          text-align: center;
          margin-top: var(--spacing-4);
        }
        
        @media (max-width: 992px) {
          .cart-content {
            grid-template-columns: 1fr;
          }
          
          .cart-summary {
            margin-top: var(--spacing-6);
          }
        }
        
        @media (max-width: 768px) {
          .cart-header {
            display: none;
          }
          
          .cart-item {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            gap: var(--spacing-4);
          }
          
          .product-col {
            grid-column: 1 / -1;
          }
          
          .price-col, .quantity-col, .total-col {
            display: grid;
            grid-template-columns: 100px 1fr;
            align-items: center;
          }
          
          .price-col::before {
            content: 'Price:';
            font-weight: 500;
            color: var(--color-gray-600);
          }
          
          .quantity-col::before {
            content: 'Quantity:';
            font-weight: 500;
            color: var(--color-gray-600);
          }
          
          .total-col::before {
            content: 'Total:';
            font-weight: 500;
            color: var(--color-gray-600);
          }
          
          .action-col {
            position: absolute;
            top: var(--spacing-4);
            right: var(--spacing-4);
          }
        }
      `}</style>
    </div>
  );
}

export default CartPage;