
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PayrollSummaryProps {
  data: {
    totals: {
      grossPay: number;
      federalTax: number;
      stateTax: number;
      socialSecurity: number;
      medicare: number;
      otherDeductions: number;
      netPay: number;
      totalTaxes: number;
    };
  };
}

export const PayrollSummary: React.FC<PayrollSummaryProps> = ({ data }) => {
  const { totals } = data;
  
  const summaryItems = [
    { label: 'Gross Pay', value: totals.grossPay, type: 'primary' },
    { label: 'Federal Income Tax', value: -totals.federalTax, type: 'deduction' },
    { label: 'State Income Tax', value: -totals.stateTax, type: 'deduction' },
    { label: 'Social Security', value: -totals.socialSecurity, type: 'deduction' },
    { label: 'Medicare', value: -totals.medicare, type: 'deduction' },
    { label: 'Other Deductions', value: -totals.otherDeductions, type: 'deduction' },
    { label: 'Net Pay', value: totals.netPay, type: 'total' },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {summaryItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <span className={item.type === 'total' ? 'font-medium text-lg' : 'text-sm text-muted-foreground'}>
                  {item.label}
                </span>
                <span 
                  className={
                    item.type === 'primary'
                      ? 'font-medium'
                      : item.type === 'deduction'
                      ? 'text-red-500'
                      : 'font-bold text-lg'
                  }
                >
                  {item.value < 0 ? '-' : ''}${Math.abs(item.value).toLocaleString()}
                </span>
              </div>
              {item.type === 'primary' && <Separator className="my-4" />}
              {item.type === 'deduction' && index === summaryItems.length - 2 && <Separator className="my-4" />}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-muted p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">Tax Summary</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Federal Tax</span>
                  <span className="text-xs">${totals.federalTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">State Tax</span>
                  <span className="text-xs">${totals.stateTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">FICA (SS & Medicare)</span>
                  <span className="text-xs">${(totals.socialSecurity + totals.medicare).toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-xs font-medium">Total Taxes</span>
                  <span className="text-xs font-medium">${totals.totalTaxes.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Payment Method</h3>
              <div className="mt-2 space-y-2">
                <div className="rounded-md bg-primary/10 p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Direct Deposit</span>
                    <span className="text-xs">${totals.netPay.toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Funds will be deposited on the pay date
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
