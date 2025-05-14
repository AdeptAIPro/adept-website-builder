
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { TaxCalendar } from '@/components/payroll/TaxCalendar';
import { TaxEvent as ApiTaxEvent } from '@/services/api/payroll/tax-filing';
import { format } from 'date-fns';
import { DayClickEventHandler } from 'react-day-picker';

interface TaxEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "federal" | "state" | "local";
  status: "completed" | "pending" | "overdue";
}

interface TaxCalendarWrapperProps {
  events: ApiTaxEvent[];
  date: Date;
  setDate: (date: Date) => void;
  currentYear: number;
  currentQuarter: number;
}

export const TaxCalendarWrapper: React.FC<TaxCalendarWrapperProps> = ({ 
  events, 
  date, 
  setDate,
  currentYear,
  currentQuarter  
}) => {
  // Transform API events to match component's expected TaxEvent type
  const transformEvents = (apiEvents: ApiTaxEvent[]): TaxEvent[] => {
    return apiEvents.map(event => ({
      ...event,
      status: event.status || 'pending' // Provide default status if missing
    }));
  };

  return (
    <div>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border"
          components={{
            DayContent: (props) => {
              // Check if the day has a tax event
              const hasEvent = events.some(
                (event) => format(new Date(event.date), 'yyyy-MM-dd') === format(props.date, 'yyyy-MM-dd')
              );
              
              return (
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <div>{props.date.getDate()}</div>
                  {hasEvent && (
                    <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </div>
              );
            },
          }}
        />
      </div>
      
      <TaxCalendar 
        events={transformEvents(events)} 
        year={currentYear} 
        quarter={currentQuarter} 
      />
    </div>
  );
};
