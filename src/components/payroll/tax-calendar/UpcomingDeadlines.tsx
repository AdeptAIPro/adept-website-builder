
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TaxEvent } from '../TaxCalendar';

interface UpcomingDeadlinesProps {
  events: TaxEvent[];
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ events }) => {
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-sm font-medium mb-4">Upcoming Deadlines</h3>
      <div className="space-y-4">
        {upcomingEvents.map(event => (
          <div key={event.id} className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className={
                  event.type === 'federal' 
                    ? 'bg-blue-500'
                    : event.type === 'state'
                    ? 'bg-green-500'
                    : 'bg-amber-500'
                }>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Badge>
                <h4 className="text-sm font-medium">{event.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{event.description}</p>
              <p className="text-xs font-medium">Due: {format(new Date(event.date), 'MMMM d, yyyy')}</p>
            </div>
            <Button variant="outline" size="sm">Prepare</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
