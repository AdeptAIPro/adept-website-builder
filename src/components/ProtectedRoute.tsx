
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthStorage } from '@/hooks/useAuthStorage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { trackFreeUsage } = useAuthStorage();
  
  // If user is authenticated, allow access
  if (isAuthenticated) {
    return <>{children}</>;
  }
  
  // For talent matchmaking page, check usage limit
  if (location.pathname === "/dashboard/talent") {
    const usageCount = parseInt(localStorage.getItem('freeUsageCount') || '0', 10);
    
    if (usageCount < 5) {
      // Track this usage
      trackFreeUsage();
      return <>{children}</>;
    } else {
      // Redirect to pricing page if usage limit reached
      return <Navigate to="/pricing" state={{ from: location }} replace />;
    }
  }
  
  // Allow access to main dashboard even when not authenticated
  if (location.pathname === "/dashboard") {
    return <>{children}</>;
  }
  
  // For other protected routes, redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
