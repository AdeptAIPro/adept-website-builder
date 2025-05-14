
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

interface PayrollRecentActivityProps {
  activities?: ActivityItem[];
}

export const PayrollRecentActivity: React.FC<PayrollRecentActivityProps> = ({ activities = [] }) => {
  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const activityDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - activityDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest payroll actions</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Activity className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="border-l-2 border-primary/20 pl-4">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{activity.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{timeAgo(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
