
import { useState } from 'react';
import { User } from '@/types/auth';
import { authApi } from '@/services/api';
import { useAuthStorage } from './useAuthStorage';
import { toast } from '@/hooks/use-toast';

export const useAuthOperations = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getStoredUser, storeUserData, clearUserData, trackFreeUsage } = useAuthStorage();

  const initAuth = () => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
      
      // Check for error in a type-safe way
      if ('error' in response) {
        throw new Error(response.error);
      }
      
      // If we got here, login was successful
      const userData = { 
        email,
        companyName: localStorage.getItem('companyName') || undefined,
        tenantId: localStorage.getItem('tenantId') || undefined,
        role: localStorage.getItem('userRole') || 'user',
        usageCount: 0
      };
      
      setUser(userData);
      storeUserData(userData);
      
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
      const response = await authApi.socialLogin(provider);
      
      // Check for error in a type-safe way
      if ('error' in response) {
        throw new Error(response.error);
      }
      
      // If we got here, login was successful
      const demoEmail = `demo.${provider}@example.com`;
      const demoCompany = `Demo Company (${provider})`;
      const tenantId = `tenant-${demoEmail.split('@')[0]}`;
      
      const userData = { 
        email: demoEmail,
        companyName: demoCompany,
        tenantId,
        role: 'user',
        usageCount: 0
      };
      
      setUser(userData);
      storeUserData(userData);
      
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
      const response = await authApi.signup(email, password, companyName);
      
      // Check for error in a type-safe way
      if ('error' in response) {
        throw new Error(response.error);
      }
      
      // If we got here, signup was successful
      const userData = { 
        email, 
        companyName,
        tenantId: localStorage.getItem('tenantId'),
        role: 'user',
        usageCount: 0
      };
      
      setUser(userData);
      storeUserData(userData);
      
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
    clearUserData();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const checkUsageLimit = async (): Promise<boolean> => {
    // For logged-in users, assume they have access
    if (user) return true;
    
    // For non-logged in users, track usage
    const hasRemainingUsage = trackFreeUsage();
    
    if (!hasRemainingUsage) {
      toast({
        title: "Usage limit reached",
        description: "You've reached the free usage limit. Please sign up for a paid plan to continue.",
        variant: "destructive",
      });
      return false;
    }
    
    // Calculate remaining uses
    const usageCount = parseInt(localStorage.getItem('freeUsageCount') || '0', 10);
    toast({
      title: "Free usage",
      description: `${5 - usageCount} free uses remaining.`,
    });
    return true;
  };

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    initAuth,
    login,
    socialLogin,
    signup,
    logout,
    checkUsageLimit
  };
};
