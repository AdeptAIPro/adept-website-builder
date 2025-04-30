
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      <div className="flex-1 flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-lg shadow p-6">
                <h3 className="font-medium mb-2 text-lg">Active Projects</h3>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="bg-card rounded-lg shadow p-6">
                <h3 className="font-medium mb-2 text-lg">Total Candidates</h3>
                <p className="text-3xl font-bold">348</p>
              </div>
              <div className="bg-card rounded-lg shadow p-6">
                <h3 className="font-medium mb-2 text-lg">Match Rate</h3>
                <p className="text-3xl font-bold">87%</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <div>
                      <p className="font-medium">New candidate application</p>
                      <p className="text-sm text-muted-foreground">John Smith applied for Senior Developer</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <div>
                      <p className="font-medium">Interview scheduled</p>
                      <p className="text-sm text-muted-foreground">Sarah Jones - Project Manager position</p>
                    </div>
                    <span className="text-sm text-muted-foreground">Yesterday</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <div>
                      <p className="font-medium">New job posted</p>
                      <p className="text-sm text-muted-foreground">Frontend Developer - Remote</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Review 5 new candidate matches for Frontend Developer position</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Complete compliance training for new hiring regulations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Update company profile to attract more qualified candidates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
