
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { FileUploadStep, FormSchemaType, FormUploader } from './FormUploader';
import { payrollApi } from '@/services/api/payroll';

interface TaxFormUploaderDialogProps {
  formId: string;
  formName?: string;
  onUploadSuccess?: () => void;
}

export const TaxFormUploaderDialog: React.FC<TaxFormUploaderDialogProps> = ({ 
  formId, 
  formName = 'Tax Form',
  onUploadSuccess 
}) => {
  const [open, setOpen] = useState(false);
  const [fileUploadStep, setFileUploadStep] = useState<FileUploadStep>('select');

  const uploadFormMutation = useMutation({
    mutationFn: (data: FormData) => payrollApi.uploadTaxForm(data),
    onSuccess: () => {
      toast({
        title: 'Form Uploaded',
        description: 'The tax form has been successfully uploaded.',
      });
      setFileUploadStep('success');
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      setTimeout(() => {
        setOpen(false);
        setFileUploadStep('select');
      }, 2000);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      setFileUploadStep('select');
    },
  });

  const handleSubmit = (data: FormSchemaType, file: File) => {
    setFileUploadStep('uploading');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('formId', formId);
    formData.append('formType', data.formType);
    formData.append('formPeriod', data.formPeriod);
    formData.append('jurisdictionType', data.jurisdictionType);
    
    if (data.jurisdiction) {
      formData.append('jurisdiction', data.jurisdiction);
    }
    
    uploadFormMutation.mutate(formData);
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        Upload Form
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload {formName}</DialogTitle>
            <DialogDescription>
              Please complete the form and upload the required documents.
            </DialogDescription>
          </DialogHeader>

          {fileUploadStep === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Upload Complete</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Your tax form has been successfully uploaded.
              </p>
            </div>
          ) : (
            <FormUploader 
              onSubmit={handleSubmit} 
              isLoading={fileUploadStep === 'uploading'} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
