
import { User } from '@/types/auth';

export const useAuthStorage = () => {
  const getStoredUser = (): User | null => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuth) {
      const email = localStorage.getItem('userEmail') || '';
      const companyName = localStorage.getItem('companyName');
      const tenantId = localStorage.getItem('tenantId');
      const role = localStorage.getItem('userRole');
      const usageCount = localStorage.getItem('usageCount') ? 
        parseInt(localStorage.getItem('usageCount') || '0', 10) : 0;
      
      return { 
        email,
        companyName: companyName || undefined,
        tenantId: tenantId || undefined,
        role: role || undefined,
        usageCount
      };
    }
    return null;
  };

  const storeUserData = (user: User) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', user.email);
    if (user.companyName) localStorage.setItem('companyName', user.companyName);
    if (user.tenantId) localStorage.setItem('tenantId', user.tenantId);
    if (user.role) localStorage.setItem('userRole', user.role);
    if (user.usageCount !== undefined) localStorage.setItem('usageCount', user.usageCount.toString());
  };

  const clearUserData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('companyName');
    localStorage.removeItem('tenantId');
    localStorage.removeItem('userRole');
  };

  const trackFreeUsage = (): boolean => {
    // For non-logged in users, track usage count by IP address
    const usageCount = parseInt(localStorage.getItem('freeUsageCount') || '0', 10);
    const newCount = usageCount + 1;
    localStorage.setItem('freeUsageCount', newCount.toString());
    
    console.log(`Free usage tracked: ${newCount}/5`);
    
    // Limit is 5 uses per IP address
    return newCount <= 5;
  };

  return {
    getStoredUser,
    storeUserData,
    clearUserData,
    trackFreeUsage
  };
};
