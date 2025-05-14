
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaxFormUploaderProps {
  formId: string;
  onUpload: (file: File) => void;
}

export const TaxFormUploader: React.FC<TaxFormUploaderProps> = ({ formId, onUpload }) => {
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
