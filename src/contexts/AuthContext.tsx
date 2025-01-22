import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, usersApi } from '../api/users';
import { authApi } from '../api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('accessToken'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        const userData = await usersApi.getCurrentUser();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]); 

  const login = (userData: User) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Failed to process login data');
    }
  };

  const logout = async () => {
    try {
      // Очищаем токены при выходе
      authApi.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 