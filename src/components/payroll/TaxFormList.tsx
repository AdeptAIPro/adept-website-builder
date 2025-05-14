
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, FileCheck } from 'lucide-react';
import { TaxForm } from '@/services/api/payroll/tax-filing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TaxFormUploader } from './TaxFormUploader';

interface TaxFormListProps {
  forms: TaxForm[];
  isLoading: boolean;
  onUpload: (formType: string, file: File) => Promise<void>;
}

export const TaxFormList: React.FC<TaxFormListProps> = ({ forms, isLoading, onUpload }) => {
  // Function to determine badge variant based on status
  const getBadgeVariant = (status: 'completed' | 'pending' | 'overdue') => {
    switch (status) {
      case 'completed':
        return 'outline';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {forms.map((form) => (
        <div key={form.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{form.formName}</h3>
              <p className="text-sm text-muted-foreground">{form.description}</p>
            </div>
            <Badge variant={getBadgeVariant(form.status)}>
              {form.status === 'completed' ? 'Filed' : form.status === 'pending' ? 'Due Soon' : 'Overdue'}
            </Badge>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Due: {form.dueDate}</span>
              </div>
            </div>
            {form.status === 'completed' ? (
              <Button variant="outline" size="sm" className="ml-auto">
                <FileCheck className="mr-2 h-4 w-4" />
                View Filed Form
              </Button>
            ) : (
              <TaxFormUploader formId={form.id} onUpload={(file) => onUpload(form.id, file)} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
