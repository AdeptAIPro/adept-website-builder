
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CalendarLegend = () => {
  return (
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
  );
};

export default CalendarLegend;
