import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

function PaymentPage() {
  const { cartItems, getCartTotal, createOrder } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    shippingAddress: currentUser ? currentUser.address : '',
    shippingCity: currentUser ? currentUser.city : '',
    shippingZipCode: currentUser ? currentUser.zipCode : '',
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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
    
    // Validate card number
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumberClean)) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    // Validate expiry date
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    }
    
    // Validate CVV
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    // Validate shipping address
    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping address is required';
    }
    
    // Validate shipping city
    if (!formData.shippingCity.trim()) {
      newErrors.shippingCity = 'City is required';
    }
    
    // Validate shipping zip code
    if (!formData.shippingZipCode.trim()) {
      newErrors.shippingZipCode = 'Zip code is required';
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
    
    setIsProcessing(true);
    
    // Payment info for storing with order
    const paymentInfo = {
      cardLast4: formData.cardNumber.slice(-4),
      nameOnCard: formData.name,
      paymentDate: new Date().toISOString()
    };
    
    // Shipping info
    const shippingInfo = {
      address: formData.shippingAddress,
      city: formData.shippingCity,
      zipCode: formData.shippingZipCode
    };
    
    // Create order and get orderId
    const orderId = createOrder(paymentInfo, shippingInfo);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/invoice/${orderId}`);
    }, 1500);
  };
  
  return (
    <div className="payment-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="payment-content">
          <div className="payment-form-container">
            <h2>Payment Information</h2>
            
            <form onSubmit={handleSubmit} className="payment-form">
              <div className="section">
                <h3>Card Details</h3>
                
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name on Card</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                  />
                  {errors.name && <div className="error">{errors.name}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4242 4242 4242 4242"
                    maxLength="19"
                  />
                  {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && <div className="error">{errors.expiryDate}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <div className="error">{errors.cvv}</div>}
                  </div>
                </div>
              </div>
              
              <div className="section">
                <h3>Shipping Address</h3>
                
                <div className="form-group">
                  <label htmlFor="shippingAddress" className="form-label">Address</label>
                  <input
                    type="text"
                    id="shippingAddress"
                    name="shippingAddress"
                    className={`form-control ${errors.shippingAddress ? 'is-invalid' : ''}`}
                    value={formData.shippingAddress}
                    onChange={handleChange}
                  />
                  {errors.shippingAddress && <div className="error">{errors.shippingAddress}</div>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="shippingCity" className="form-label">City</label>
                    <input
                      type="text"
                      id="shippingCity"
                      name="shippingCity"
                      className={`form-control ${errors.shippingCity ? 'is-invalid' : ''}`}
                      value={formData.shippingCity}
                      onChange={handleChange}
                    />
                    {errors.shippingCity && <div className="error">{errors.shippingCity}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="shippingZipCode" className="form-label">Zip Code</label>
                    <input
                      type="text"
                      id="shippingZipCode"
                      name="shippingZipCode"
                      className={`form-control ${errors.shippingZipCode ? 'is-invalid' : ''}`}
                      value={formData.shippingZipCode}
                      onChange={handleChange}
                    />
                    {errors.shippingZipCode && <div className="error">{errors.shippingZipCode}</div>}
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn payment-btn" 
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="items-container">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                    <span className="item-quantity">{item.quantity}</span>
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-calculations">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .payment-page {
          padding: var(--spacing-10) 0;
        }
        
        .payment-content {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: var(--spacing-8);
          margin-top: var(--spacing-8);
        }
        
        .payment-form-container, .order-summary {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-6);
        }
        
        .payment-form {
          margin-top: var(--spacing-4);
        }
        
        .section {
          margin-bottom: var(--spacing-6);
        }
        
        .section h3 {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-4);
          padding-bottom: var(--spacing-2);
          border-bottom: 1px solid var(--color-gray-200);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-4);
        }
        
        .payment-btn {
          width: 100%;
          padding: var(--spacing-4);
          font-size: 1.125rem;
          margin-top: var(--spacing-2);
        }
        
        .items-container {
          margin: var(--spacing-4) 0;
          max-height: 320px;
          overflow-y: auto;
        }
        
        .summary-item {
          display: flex;
          padding: var(--spacing-3) 0;
          border-bottom: 1px solid var(--color-gray-200);
        }
        
        .item-image {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          overflow: hidden;
          position: relative;
          margin-right: var(--spacing-3);
        }
        
        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .item-quantity {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: var(--color-primary-500);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }
        
        .item-details {
          flex: 1;
        }
        
        .item-details h4 {
          font-size: 0.875rem;
          margin-bottom: var(--spacing-1);
        }
        
        .item-price {
          font-size: 0.8125rem;
          color: var(--color-gray-600);
        }
        
        .item-total {
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        
        .summary-calculations {
          margin-top: var(--spacing-4);
          padding-top: var(--spacing-4);
          border-top: 1px solid var(--color-gray-200);
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-3);
        }
        
        .summary-row.total {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: var(--spacing-4);
          padding-top: var(--spacing-4);
          border-top: 1px solid var(--color-gray-200);
        }
        
        @media (max-width: 992px) {
          .payment-content {
            grid-template-columns: 1fr;
          }
          
          .order-summary {
            order: -1;
            margin-bottom: var(--spacing-6);
          }
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default PaymentPage;