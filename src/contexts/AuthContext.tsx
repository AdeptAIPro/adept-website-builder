
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface User {
  email: string;
  companyName?: string;
  tenantId?: string; // Added for multi-tenant architecture
  role?: string;     // Added for role-based access control
  usageCount?: number; // Track usage for free tier
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (provider: 'google' | 'facebook' | 'linkedin') => Promise<void>;
  signup: (email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
  checkUsageLimit: () => Promise<boolean>; // Added for free tier usage limit
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
        const role = localStorage.getItem('userRole');
        const usageCount = localStorage.getItem('usageCount') ? 
          parseInt(localStorage.getItem('usageCount') || '0', 10) : 0;
        
        setUser({ 
          email,
          companyName: companyName || undefined,
          tenantId: tenantId || undefined,
          role: role || undefined,
          usageCount
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
        tenantId: localStorage.getItem('tenantId') || undefined,
        role: localStorage.getItem('userRole') || 'user',
        usageCount: 0
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

  const socialLogin = async (provider: 'google' | 'facebook' | 'linkedin') => {
    setIsLoading(true);
    try {
      // In development, this is a simulated call
      // In production, this will call Lambda through API Gateway
      const response = await authApi.socialLogin(provider);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // If we got here, login was successful
      const demoEmail = `demo.${provider}@example.com`;
      const demoCompany = `Demo Company (${provider})`;
      
      localStorage.setItem('userEmail', demoEmail);
      localStorage.setItem('companyName', demoCompany);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('tenantId', `tenant-${demoEmail.split('@')[0]}`);
      localStorage.setItem('userRole', 'user');
      
      setUser({ 
        email: demoEmail,
        companyName: demoCompany,
        tenantId: `tenant-${demoEmail.split('@')[0]}`,
        role: 'user',
        usageCount: 0
      });
      
      toast({
        title: "Login successful",
        description: `Successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`,
      });
      
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast({
        title: "Social login failed",
        description: error instanceof Error ? error.message : `${provider} authentication failed. Please try again.`,
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
        tenantId: localStorage.getItem('tenantId'),
        role: 'user',
        usageCount: 0
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

  const checkUsageLimit = async (): Promise<boolean> => {
    // For non-logged in users, track usage count by IP address
    if (!user) {
      // In a real implementation, this would be tracked by IP in the backend
      // Here we use localStorage as a simplified simulation
      const usageCount = parseInt(localStorage.getItem('freeUsageCount') || '0', 10);
      const newCount = usageCount + 1;
      localStorage.setItem('freeUsageCount', newCount.toString());
      
      // Limit is 5 uses per IP address
      if (newCount > 5) {
        toast({
          title: "Usage limit reached",
          description: "You've reached the free usage limit. Please sign up for a paid plan to continue.",
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Free usage",
        description: `${5 - newCount} free uses remaining.`,
      });
      return true;
    }
    
    // For logged in users, the backend would handle this
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        socialLogin,
        signup,
        logout,
        checkUsageLimit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
