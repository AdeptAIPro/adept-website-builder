
export interface User {
  email: string;
  companyName?: string;
  tenantId?: string;
  role?: string;
  usageCount?: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (provider: 'google' | 'facebook' | 'linkedin') => Promise<void>;
  signup: (email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
  checkUsageLimit: () => Promise<boolean>;
}
