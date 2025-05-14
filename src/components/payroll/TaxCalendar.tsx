
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TaxEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  formId?: string;
  status: 'pending' | 'completed' | 'overdue';
  type: 'federal' | 'state' | 'local';
}

interface TaxCalendarProps {
  events: TaxEvent[];
  year: number;
  quarter: number;
}

export const TaxCalendar: React.FC<TaxCalendarProps> = ({ events, year, quarter }) => {
  // Determine the months in the selected quarter
  const startMonth = (quarter - 1) * 3;
  const months = [startMonth, startMonth + 1, startMonth + 2];

  const getEventsByDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const getMonthName = (monthIndex: number) => {
    return format(new Date(year, monthIndex), 'MMMM');
  };

  const renderMonth = (monthIndex: number) => {
    const monthStart = startOfMonth(new Date(year, monthIndex));
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startDay = getDay(monthStart);

    return (
      <div key={monthIndex} className="mb-8">
        <h3 className="mb-4 text-lg font-medium">{getMonthName(monthIndex)} {year}</h3>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24 rounded-md"></div>
          ))}
          {days.map((day) => {
            const dayEvents = getEventsByDay(day);
            const hasEvents = dayEvents.length > 0;
            
            return (
              <div
                key={day.toString()}
                className={`h-24 rounded-md border p-1 ${
                  hasEvents ? 'border-primary/50 bg-primary/5' : ''
                }`}
              >
                <div className="text-xs font-medium">{format(day, 'd')}</div>
                <div className="mt-1 space-y-1 overflow-y-auto max-h-[70px]">
                  {dayEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="text-xs px-1 py-0.5 rounded"
                    >
                      <div className="flex items-center gap-1">
                        <Badge className={
                          event.type === 'federal' 
                            ? 'bg-blue-500 h-1.5 w-1.5 rounded-full p-0'
                            : event.type === 'state'
                            ? 'bg-green-500 h-1.5 w-1.5 rounded-full p-0'
                            : 'bg-amber-500 h-1.5 w-1.5 rounded-full p-0'
                        } />
                        <span className="truncate font-medium">{event.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500 h-3 w-3 rounded-full p-0" />
              <span className="text-sm font-medium">Federal Deadlines</span>
            </div>
            <p className="text-xs text-muted-foreground">IRS filing requirements and due dates</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 h-3 w-3 rounded-full p-0" />
              <span className="text-sm font-medium">State Deadlines</span>
            </div>
            <p className="text-xs text-muted-foreground">State-specific tax filing deadlines</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500 h-3 w-3 rounded-full p-0" />
              <span className="text-sm font-medium">Local Deadlines</span>
            </div>
            <p className="text-xs text-muted-foreground">Local and municipal tax requirements</p>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        {months.map(month => renderMonth(month))}
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-4">Upcoming Deadlines</h3>
        <div className="space-y-4">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 3)
            .map(event => (
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
    </div>
  );
};
