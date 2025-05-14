
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  name: string;
  grossPay: number;
  taxes: number;
  netPay: number;
}

interface PayrollSummaryChartProps {
  data: ChartDataPoint[];
}

export const PayrollSummaryChart: React.FC<PayrollSummaryChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
          <p className="text-sm font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center space-x-2">
                <div 
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <p className="text-xs text-muted-foreground">
                  {entry.name}: ${entry.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            scale="point" 
            padding={{ left: 10, right: 10 }} 
            className="text-xs"
          />
          <YAxis 
            className="text-xs"
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="grossPay" 
            fill="#3f51b5" 
            name="Gross Pay" 
            className="fill-blue-600 dark:fill-blue-400"
          />
          <Bar 
            dataKey="taxes" 
            fill="#f44336" 
            name="Taxes & Deductions" 
            className="fill-red-500 dark:fill-red-400"
          />
          <Bar 
            dataKey="netPay" 
            fill="#4caf50" 
            name="Net Pay" 
            className="fill-green-500 dark:fill-green-400"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
