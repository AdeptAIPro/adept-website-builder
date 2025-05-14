import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { payrollApi } from '@/services/api/payroll';

interface TaxFormUploaderProps {
  formId: string;
  onUpload: (file: File) => void;
}

export const TaxFormUploader: React.FC<TaxFormUploaderProps> = ({ formId, onUpload }) => {
  const [fileUploadStep, setFileUploadStep] = useState<'select' | 'uploading' | 'success'>('select');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const formSchema = z.object({
    formType: z.string().min(1, {
      message: 'Please select a form type.',
    }),
    formPeriod: z.string().min(1, {
      message: 'Please select the tax period.',
    }),
    jurisdictionType: z.enum(['federal', 'state', 'local']),
    jurisdiction: z.string().optional(),
    file: z.any().refine((file) => file && file.size > 0, {
      message: 'Please upload a file.',
    }),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jurisdictionType: 'federal',
    },
  });

  const uploadFormMutation = useMutation({
    mutationFn: (data: FormData) => payrollApi.uploadTaxForm(data),
    onSuccess: () => {
      toast({
        title: 'Form Uploaded',
        description: 'The tax form has been successfully uploaded.',
      });
      setFileUploadStep('success');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      form.setValue('file', files[0]);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!selectedFile) return;
    
    setFileUploadStep('uploading');
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    // Call the onUpload callback
    onUpload(selectedFile);
    
    // For demonstration purposes, we'll still use the mutation
    uploadFormMutation.mutate(formData);
  };

  return (
    <Button variant="outline" size="sm" onClick={() => document.getElementById(`file-upload-${formId}`)?.click()}>
      <Upload className="mr-2 h-4 w-4" />
      Upload Form
      <input
        id={`file-upload-${formId}`}
        type="file"
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg,.tiff"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
          }
        }}
      />
    </Button>
  );
};
