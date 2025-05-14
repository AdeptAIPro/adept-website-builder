
import React from 'react';
import CalendarLegend from './tax-calendar/CalendarLegend';
import MonthCalendar from './tax-calendar/MonthCalendar';
import UpcomingDeadlines from './tax-calendar/UpcomingDeadlines';

export interface TaxEvent {
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

  return (
    <div className="space-y-6">
      <CalendarLegend />

      <div className="space-y-6">
        {months.map(month => (
          <MonthCalendar 
            key={month} 
            monthIndex={month} 
            year={year} 
            events={events} 
          />
        ))}
      </div>

      <UpcomingDeadlines events={events} />
    </div>
  );
};
