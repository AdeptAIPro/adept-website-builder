
import React, { useEffect, useState } from 'react';
import { dashboardApi } from '@/services/api';
import { toast } from "@/hooks/use-toast";
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';

interface DashboardStats {
  activeProjects: number;
  totalCandidates: number;
  matchRate: string;
}

interface Activity {
  type: string;
  description: string;
  time: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // These calls would go to AWS Lambda in production
        const [statsResponse, activitiesResponse, actionsResponse] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRecentActivity(),
          dashboardApi.getRecommendedActions()
        ]);
        
        if (statsResponse.data) {
          setStats(statsResponse.data);
        }
        
        if (activitiesResponse.data) {
          setActivities(activitiesResponse.data.activities);
        }
        
        if (actionsResponse.data) {
          setActions(actionsResponse.data.actions);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        toast({
          title: "Error loading dashboard",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive"
        });
        
        // Fallback to demo data if API call fails
        setStats({
          activeProjects: 12,
          totalCandidates: 348,
          matchRate: "87%"
        });
        
        setActivities([
          {
            type: "application",
            description: "John Smith applied for Senior Developer",
            time: "2 hours ago"
          },
          {
            type: "interview",
            description: "Sarah Jones - Project Manager position",
            time: "Yesterday"
          },
          {
            type: "job",
            description: "Frontend Developer - Remote",
            time: "2 days ago"
          }
        ]);
        
        setActions([
          "Review 5 new candidate matches for Frontend Developer position",
          "Complete compliance training for new hiring regulations",
          "Update company profile to attract more qualified candidates"
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

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
                <p className="text-3xl font-bold">{isLoading ? "..." : stats?.activeProjects || 0}</p>
              </div>
              <div className="bg-card rounded-lg shadow p-6">
                <h3 className="font-medium mb-2 text-lg">Total Candidates</h3>
                <p className="text-3xl font-bold">{isLoading ? "..." : stats?.totalCandidates || 0}</p>
              </div>
              <div className="bg-card rounded-lg shadow p-6">
                <h3 className="font-medium mb-2 text-lg">Match Rate</h3>
                <p className="text-3xl font-bold">{isLoading ? "..." : stats?.matchRate || "0%"}</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-14 bg-muted/30 rounded-md"></div>
                      <div className="h-14 bg-muted/30 rounded-md"></div>
                      <div className="h-14 bg-muted/30 rounded-md"></div>
                    </div>
                  ) : activities.length > 0 ? (
                    activities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                        <div>
                          <p className="font-medium">
                            {activity.type === "application" ? "New candidate application" :
                             activity.type === "interview" ? "Interview scheduled" :
                             activity.type === "job" ? "New job posted" : 
                             activity.type}
                          </p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
                {isLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-muted/30 rounded w-3/4"></div>
                    <div className="h-6 bg-muted/30 rounded w-4/5"></div>
                    <div className="h-6 bg-muted/30 rounded w-2/3"></div>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {actions.map((action, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
