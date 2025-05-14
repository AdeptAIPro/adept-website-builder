
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

export const TaxFormUploader: React.FC = () => {
  const [fileUploadStep, setFileUploadStep] = useState<'select' | 'uploading' | 'success'>('select');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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
    formData.append('formType', data.formType);
    formData.append('formPeriod', data.formPeriod);
    formData.append('jurisdictionType', data.jurisdictionType);
    
    if (data.jurisdiction) {
      formData.append('jurisdiction', data.jurisdiction);
    }
    
    uploadFormMutation.mutate(formData);
  };

  return (
    <div className="py-4">
      {fileUploadStep === 'select' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="formType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select form type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="w2">W-2 (Wage and Tax Statement)</SelectItem>
                      <SelectItem value="w4">W-4 (Employee Withholding)</SelectItem>
                      <SelectItem value="940">Form 940 (FUTA Tax Return)</SelectItem>
                      <SelectItem value="941">Form 941 (Quarterly Tax Return)</SelectItem>
                      <SelectItem value="1099">Form 1099 (Contractor Payments)</SelectItem>
                      <SelectItem value="i9">Form I-9 (Employment Eligibility)</SelectItem>
                      <SelectItem value="state_withholding">State Withholding</SelectItem>
                      <SelectItem value="other">Other Form</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="formPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Period</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax period"  />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2023-Q1">2023 - Q1 (Jan-Mar)</SelectItem>
                      <SelectItem value="2023-Q2">2023 - Q2 (Apr-Jun)</SelectItem>
                      <SelectItem value="2023-Q3">2023 - Q3 (Jul-Sep)</SelectItem>
                      <SelectItem value="2023-Q4">2023 - Q4 (Oct-Dec)</SelectItem>
                      <SelectItem value="2023-annual">2023 - Annual</SelectItem>
                      <SelectItem value="2024-Q1">2024 - Q1 (Jan-Mar)</SelectItem>
                      <SelectItem value="2024-Q2">2024 - Q2 (Apr-Jun)</SelectItem>
                      <SelectItem value="na">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jurisdictionType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Jurisdiction</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="federal" id="federal" />
                        <Label htmlFor="federal">Federal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="state" id="state" />
                        <Label htmlFor="state">State</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="local" id="local" />
                        <Label htmlFor="local">Local</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('jurisdictionType') === 'state' && (
              <FormField
                control={form.control}
                name="jurisdiction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.watch('jurisdictionType') === 'local' && (
              <FormField
                control={form.control}
                name="jurisdiction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local Jurisdiction</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter city or locality" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Document</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-medium">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, PNG, JPG, or TIFF (MAX. 10MB)
                          </p>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg,.tiff"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {selectedFile && (
                    <div className="mt-2 flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-2" />
                      <span className="text-muted-foreground">{selectedFile.name}</span>
                    </div>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={uploadFormMutation.isPending}>
                {uploadFormMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload Form'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      )}

      {fileUploadStep === 'uploading' && (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
          <h3 className="text-lg font-medium">Uploading Form</h3>
          <p className="text-muted-foreground mt-2">
            Please wait while your form is being processed...
          </p>
        </div>
      )}

      {fileUploadStep === 'success' && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="rounded-full bg-green-500/20 p-3 mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-lg font-medium">Form Uploaded Successfully</h3>
          <p className="text-muted-foreground mt-2 text-center max-w-md">
            Your tax form has been successfully uploaded and will be processed.
            You can track its status in the Tax Forms section.
          </p>
          <DialogFooter className="mt-6">
            <Button onClick={() => setFileUploadStep('select')}>Upload Another Form</Button>
          </DialogFooter>
        </div>
      )}
    </div>
  );
};
