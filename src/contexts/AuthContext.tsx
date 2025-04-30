
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface User {
  email: string;
  companyName?: string;
  tenantId?: string; // Added for multi-tenant architecture
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      if (isAuth) {
        const email = localStorage.getItem('userEmail') || '';
        const companyName = localStorage.getItem('companyName');
        const tenantId = localStorage.getItem('tenantId');
        
        setUser({ 
          email,
          companyName: companyName || undefined,
          tenantId: tenantId || undefined
        });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In development, this is a simulated call
      // In production, this will call Lambda through API Gateway
      const response = await authApi.login(email, password);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // If we got here, login was successful
      setUser({ 
        email,
        companyName: localStorage.getItem('companyName') || undefined,
        tenantId: localStorage.getItem('tenantId') || undefined
      });
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, companyName: string) => {
    setIsLoading(true);
    try {
      // In development, this is a simulated call
      // In production, this will call Lambda through API Gateway
      const response = await authApi.signup(email, password, companyName);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // If we got here, signup was successful
      setUser({ 
        email, 
        companyName,
        tenantId: localStorage.getItem('tenantId')
      });
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "There was a problem creating your account.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
