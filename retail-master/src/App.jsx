import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import InvoicePage from './pages/InvoicePage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './contexts/AuthContext.jsx'

function App() {
  const location = useLocation();
  const { loading } = useAuth();
  const [pageTransition, setPageTransition] = useState(false);

  // Handle page transitions
  useEffect(() => {
    setPageTransition(true);
    const timeout = setTimeout(() => {
      setPageTransition(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Header />
      <main className={`main-content ${pageTransition ? 'fade-in' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment" element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } />
          <Route path="/invoice/:orderId" element={
            <ProtectedRoute>
              <InvoicePage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    
    </div>
  )
}

export default App