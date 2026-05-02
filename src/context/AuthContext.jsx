import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for a session
    const storedUser = localStorage.getItem('dentobees_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@gmail.com' && password === 'admin123') {
          const userData = {
            id: 1,
            name: 'Admin',
            email: 'admin@gmail.com',
            role: 'Administrator',
            avatar: 'https://img.freepik.com/premium-vector/doctor-profile-icon-medical-physician-logo-concept_123447-1282.jpg'
          };
          setUser(userData);
          localStorage.setItem('dentobees_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800); // simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dentobees_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
