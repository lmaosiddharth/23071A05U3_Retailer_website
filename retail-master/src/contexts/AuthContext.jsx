import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Register new user
  const register = (userData) => {
    // In a real app, this would make an API call
    // For this demo, we'll just store in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    return Promise.resolve(userData);
  };

  // Login user
  const login = (email, password) => {
    // Simulate checking credentials
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.email === email && user.password === password) {
        setCurrentUser(user);
        return Promise.resolve(user);
      }
    }
    return Promise.reject(new Error('Invalid email or password'));
  };

  // Logout user
  const logout = () => {
    // In a real app, this would make an API call
    // For this demo, we'll just remove from localStorage
    localStorage.removeItem('user');
    setCurrentUser(null);
    return Promise.resolve();
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}