import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

function InvoicePage() {
  const { orderId } = useParams();
  const { getOrder } = useCart();
  const { currentUser } = useAuth();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    if (orderId) {
      const orderData = getOrder(orderId);
      if (orderData) {
        setOrder(orderData);
      }
    }
  }, [orderId, getOrder]);
  
  const handlePrint = () => {
    window.print();
  };
  
  if (!order) {
    return (
      <div className="container">
        <div className="order-not-found">
          <h2>Order Not Found</h2>
          <p>Sorry, we couldn't find the order you're looking for.</p>
          <Link to="/" className="btn">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  // Format date
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate totals
  const subtotal = order.total;
  const shipping = 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  
  return (
    <div className="invoice-page">
      <div className="container">
        <div className="invoice-actions no-print">
          <Link to="/" className="btn-secondary">Back to Home</Link>
          <button onClick={handlePrint} className="btn">
            Print Invoice
          </button>
        </div>
        
        <div className="invoice">
          <div className="invoice-header">
            <div className="company-info">
              <h1>StyleStore</h1>
              <p>123 Fashion Avenue</p>
              <p>New York, NY 10001</p>
              <p>support@stylestore.com</p>
            </div>
            
            <div className="invoice-details">
              <h2>Invoice</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Invoice #:</td>
                    <td>{order.id.substring(0, 8).toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td>Date:</td>
                    <td>{formattedDate}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>
                      <span className="status-badge">{order.status}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="invoice-addresses">
            <div className="address">
              <h3>Bill To:</h3>
              <p>{currentUser.firstName} {currentUser.lastName}</p>
              <p>{currentUser.email}</p>
              <p>{currentUser.phone}</p>
            </div>
            
            <div className="address">
              <h3>Ship To:</h3>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.zipCode}</p>
            </div>
            
            <div className="payment-info">
              <h3>Payment Info:</h3>
              <p>Card ending in {order.payment.cardLast4}</p>
              <p>Name: {order.payment.nameOnCard}</p>
            </div>
          </div>
          
          <div className="invoice-items">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td className="item-cell">
                      <div className="item-info">
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <p className="item-name">{item.name}</p>
                          <p className="item-category">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="invoice-summary">
            <div className="summary-table">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (5%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="invoice-footer">
            <p>Thank you for your purchase!</p>
            <p>
              For any questions regarding this invoice, please contact 
              support@stylestore.com or call (555) 123-4567
            </p>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .invoice-page {
          padding: var(--spacing-10) 0;
        }
        
        .invoice-actions {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-6);
        }
        
        .invoice {
          background-color: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: var(--spacing-8);
        }
        
        .invoice-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-8);
          padding-bottom: var(--spacing-6);
          border-bottom: 1px solid var(--color-gray-200);
        }
        
        .company-info h1 {
          color: var(--color-primary-600);
          margin-bottom: var(--spacing-2);
        }
        
        .company-info p {
          margin-bottom: var(--spacing-1);
          color: var(--color-gray-600);
        }
        
        .invoice-details h2 {
          margin-bottom: var(--spacing-4);
          color: var(--color-primary-600);
        }
        
        .invoice-details table {
          width: 100%;
        }
        
        .invoice-details td {
          padding: var(--spacing-1) 0;
        }
        
        .invoice-details td:first-child {
          font-weight: 600;
          padding-right: var(--spacing-4);
        }
        
        .status-badge {
          background-color: var(--color-success-500);
          color: white;
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          text-transform: uppercase;
        }
        
        .invoice-addresses {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-6);
          margin-bottom: var(--spacing-8);
        }
        
        .address h3, .payment-info h3 {
          font-size: 1rem;
          margin-bottom: var(--spacing-2);
          color: var(--color-gray-600);
        }
        
        .address p, .payment-info p {
          margin-bottom: var(--spacing-1);
        }
        
        .invoice-items {
          margin-bottom: var(--spacing-8);
        }
        
        .invoice-items table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .invoice-items th {
          text-align: left;
          padding: var(--spacing-3);
          background-color: var(--color-gray-100);
          font-weight: 600;
        }
        
        .invoice-items td {
          padding: var(--spacing-3);
          border-bottom: 1px solid var(--color-gray-200);
        }
        
        .item-cell {
          width: 50%;
        }
        
        .item-info {
          display: flex;
          align-items: center;
        }
        
        .item-image {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-right: var(--spacing-3);
        }
        
        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .item-name {
          font-weight: 500;
          margin-bottom: var(--spacing-1);
        }
        
        .item-category {
          font-size: 0.875rem;
          color: var(--color-gray-500);
        }
        
        .invoice-summary {
          display: flex;
          justify-content: flex-end;
          margin-bottom: var(--spacing-8);
        }
        
        .summary-table {
          width: 300px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: var(--spacing-2) 0;
        }
        
        .summary-row.total {
          font-size: 1.25rem;
          font-weight: 700;
          border-top: 2px solid var(--color-gray-300);
          padding-top: var(--spacing-3);
          margin-top: var(--spacing-3);
        }
        
        .invoice-footer {
          text-align: center;
          padding-top: var(--spacing-6);
          border-top: 1px solid var(--color-gray-200);
          color: var(--color-gray-600);
        }
        
        @media print {
          .no-print {
            display: none;
          }
          
          .invoice {
            box-shadow: none;
            padding: 0;
          }
          
          body {
            background-color: white;
          }
        }
        
        @media (max-width: 768px) {
          .invoice-header {
            flex-direction: column;
            gap: var(--spacing-6);
          }
          
          .invoice-addresses {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
          }
          
          .item-cell {
            width: auto;
          }
          
          .invoice-items th:nth-child(3),
          .invoice-items td:nth-child(3) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default InvoicePage;