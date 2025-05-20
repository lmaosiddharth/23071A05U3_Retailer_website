import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
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
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Invalid email or password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="login-page">
      <div className="container">
        <div className="form-container">
          <h1>Welcome Back</h1>
          <p className="subtitle">Log in to your StyleStore account</p>
          
          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
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
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
            
            <button 
              type="submit" 
              className="btn login-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          <div className="register-link">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .login-page {
          padding: var(--spacing-10) 0;
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
        }
        
        .form-container {
          max-width: 500px;
          margin: 0 auto;
          background-color: white;
          padding: var(--spacing-8);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        
        .subtitle {
          margin-bottom: var(--spacing-6);
          color: var(--color-gray-600);
        }
        
        .login-form {
          margin-bottom: var(--spacing-6);
        }
        
        .error-message {
          background-color: var(--color-error-500);
          color: white;
          padding: var(--spacing-3);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-4);
        }
        
        .is-invalid {
          border-color: var(--color-error-500);
        }
        
        .login-btn {
          width: 100%;
          margin-top: var(--spacing-4);
        }
        
        .register-link {
          text-align: center;
          margin-top: var(--spacing-4);
        }
      `}</style>
    </div>
  );
}

export default LoginPage;