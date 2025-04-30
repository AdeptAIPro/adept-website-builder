
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Briefcase, 
  BarChart, 
  Settings, 
  CheckSquare,
  Brain,
  Link as LinkIcon,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  active
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary/10",
        active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const activeRoute = location.pathname;
  const companyName = user?.companyName || 'Your Company';
  
  return (
    <aside className="w-64 border-r hidden md:block bg-card/50 p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold px-3">{companyName}</h2>
      </div>
      
      <nav className="space-y-1">
        <SidebarItem 
          icon={Home} 
          label="Dashboard" 
          href="/dashboard" 
          active={activeRoute === '/dashboard'}
        />
        <SidebarItem 
          icon={Brain} 
          label="Talent Matchmaking" 
          href="/dashboard/talent" 
          active={activeRoute.includes('/talent')}
        />
        <SidebarItem 
          icon={Briefcase} 
          label="Jobs" 
          href="/dashboard/jobs" 
          active={activeRoute.includes('/jobs')}
        />
        <SidebarItem 
          icon={FileText} 
          label="Payroll" 
          href="/dashboard/payroll" 
          active={activeRoute.includes('/payroll')}
        />
        <SidebarItem 
          icon={BarChart} 
          label="Analytics" 
          href="/dashboard/analytics" 
          active={activeRoute.includes('/analytics')}
        />
        <SidebarItem 
          icon={Shield} 
          label="Compliance" 
          href="/dashboard/compliance" 
          active={activeRoute.includes('/compliance')}
        />
        <SidebarItem 
          icon={LinkIcon} 
          label="Integrations" 
          href="/dashboard/integrations" 
          active={activeRoute.includes('/integrations')}
        />
        <SidebarItem 
          icon={Users} 
          label="Talent Marketplace" 
          href="/dashboard/marketplace" 
          active={activeRoute.includes('/marketplace')}
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          href="/dashboard/settings" 
          active={activeRoute.includes('/settings')}
        />
      </nav>
      
      <div className="mt-auto pt-4 border-t mt-8">
        <div className="bg-primary/5 rounded-md p-4">
          <h4 className="text-sm font-medium">Need Help?</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Contact our support team for assistance with any issues.
          </p>
          <button className="text-xs text-primary hover:underline mt-2">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
