
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Search, Settings, User, LogOut } from 'lucide-react';

const DashboardNavbar: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('companyName');
    navigate('/login');
  };
  
  return (
    <header className="bg-background border-b px-4 py-2 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="/" className="font-semibold text-xl">
            Adept<span className="text-primary">AI</span>
          </a>
          
          <div className="relative hidden md:block ml-4 w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 h-9 rounded-md border border-input bg-background"
            />
          </div>
        </div>
        
        <nav className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="relative ml-2 md:ml-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full w-8 h-8 md:w-9 md:h-9 bg-primary text-white"
            >
              <User className="h-4 w-4" />
            </Button>
            
            <div className="absolute top-full right-0 mt-1 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 hidden group-hover:block">
              <div className="p-2">
                <div className="text-sm px-3 py-2 font-medium">{userEmail}</div>
              </div>
              <div className="p-1">
                <Button 
                  variant="ghost" 
                  className="flex items-center w-full justify-start px-3 py-2 text-sm" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DashboardNavbar;
