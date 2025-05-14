
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'payroll' | 'tax' | 'benefits';
}

interface PayrollUpcomingEventsProps {
  events?: Event[];
}

export const PayrollUpcomingEvents: React.FC<PayrollUpcomingEventsProps> = ({ events = [] }) => {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'payroll':
        return 'bg-primary text-primary-foreground';
      case 'tax':
        return 'bg-destructive text-destructive-foreground';
      case 'benefits':
        return 'bg-green-500 text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'payroll':
        return 'Payroll';
      case 'tax':
        return 'Tax';
      case 'benefits':
        return 'Benefits';
      default:
        return 'Other';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Important payroll and tax dates</CardDescription>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs">
                    {new Date(event.date).getDate()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                <Badge className={getEventTypeColor(event.type)}>
                  {getEventTypeLabel(event.type)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
