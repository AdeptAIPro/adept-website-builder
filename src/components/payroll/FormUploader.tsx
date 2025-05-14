
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

export type FileUploadStep = 'select' | 'uploading' | 'success';

export const formSchema = z.object({
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

export type FormSchemaType = z.infer<typeof formSchema>;

interface FormUploaderProps {
  onSubmit: (data: FormSchemaType, file: File) => void;
  isLoading?: boolean;
}

export const FormUploader: React.FC<FormUploaderProps> = ({ onSubmit, isLoading = false }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jurisdictionType: 'federal',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      form.setValue('file', files[0]);
    }
  };

  const handleSubmit = (data: FormSchemaType) => {
    if (!selectedFile) return;
    onSubmit(data, selectedFile);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                  <SelectItem value="w2">W-2</SelectItem>
                  <SelectItem value="w4">W-4</SelectItem>
                  <SelectItem value="form941">Form 941</SelectItem>
                  <SelectItem value="form940">Form 940</SelectItem>
                  <SelectItem value="stateWithholding">State Withholding</SelectItem>
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
                    <SelectValue placeholder="Select tax period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2023-q1">2023 Q1</SelectItem>
                  <SelectItem value="2023-q2">2023 Q2</SelectItem>
                  <SelectItem value="2023-q3">2023 Q3</SelectItem>
                  <SelectItem value="2023-q4">2023 Q4</SelectItem>
                  <SelectItem value="2023-annual">2023 Annual</SelectItem>
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
              <FormLabel>Jurisdiction Type</FormLabel>
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

        {form.watch('jurisdictionType') !== 'federal' && (
          <FormField
            control={form.control}
            name="jurisdiction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {form.watch('jurisdictionType') === 'state' ? 'State' : 'Municipality'}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter jurisdiction" {...field} />
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
              <FormLabel>Upload Form</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    onChange={(e) => {
                      handleFileChange(e);
                      field.onChange(e);
                    }}
                    accept=".pdf,.png,.jpg,.jpeg,.tiff"
                    className="w-full"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Upload Form
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
