
import React, { createContext, useContext, useEffect } from 'react';
import { AuthContextType } from '@/types/auth';
import { useAuthOperations } from '@/hooks/useAuthOperations';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user,
    isLoading,
    initAuth,
    login,
    socialLogin,
    signup,
    logout,
    checkUsageLimit
  } = useAuthOperations();

  useEffect(() => {
    // Initialize authentication state from localStorage on component mount
    initAuth();
  }, []);

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
