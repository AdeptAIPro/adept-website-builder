
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { TaxEvent } from '../TaxCalendar';

interface MonthCalendarProps {
  monthIndex: number;
  year: number;
  events: TaxEvent[];
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ monthIndex, year, events }) => {
  const getEventsByDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const getMonthName = (monthIndex: number) => {
    return format(new Date(year, monthIndex), 'MMMM');
  };

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

export default MonthCalendar;
