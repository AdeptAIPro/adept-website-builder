
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CalendarIcon, Loader2 } from 'lucide-react';

import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

import { TaxCalendarWrapper } from '@/components/payroll/TaxCalendarWrapper';
import { TaxFormList } from '@/components/payroll/TaxFormList';
import { TaxFilingHistory } from '@/components/payroll/TaxFilingHistory';
import { TaxLiabilitiesCard } from '@/components/payroll/TaxLiabilitiesCard';
import { taxFilingApi, FormUploadData } from '@/services/api/payroll/tax-filing';

const TaxFiling = () => {
  // State for calendar date selection
  const [date, setDate] = useState<Date>(new Date());
  const [selectedQuarter, setSelectedQuarter] = useState<string>("2");
  const [selectedYear, setSelectedYear] = useState<string>("2023");

  // Fetch tax filing data
  const { data: taxFilingData, isLoading, refetch } = useQuery({
    queryKey: ['taxFiling', selectedYear, selectedQuarter],
    queryFn: () => taxFilingApi.getTaxFilingData(selectedYear, selectedQuarter),
  });

  // Function to handle file upload
  const handleFileUpload = async (formType: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Call the API to upload the file
      await taxFilingApi.uploadTaxForm(formData);
      
      // Show success message
      toast({
        title: "Form uploaded successfully",
        description: "Your tax form has been uploaded",
      });
      
      // Refetch data to update UI
      refetch();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your tax form",
      });
    }
  };

  // Handle quarter change
  const handleQuarterChange = (quarter: string) => {
    setSelectedQuarter(quarter);
  };

  // Handle year change
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tax Filing</h1>
          <p className="text-muted-foreground">
            Manage your tax forms, filings, and deadlines
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Tax Calendar</CardTitle>
              <CardDescription>Upcoming tax deadlines and events</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <TaxCalendarWrapper 
                  events={taxFilingData?.taxDeadlines || []} 
                  date={date} 
                  setDate={setDate}
                  currentYear={parseInt(selectedYear)}
                  currentQuarter={parseInt(selectedQuarter)}
                />
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Tax Forms</CardTitle>
                  <CardDescription>Upload and manage your tax forms</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Q{selectedQuarter} / {selectedYear}
                  </Button>
                </div>
              </div>
              <Tabs defaultValue="forms" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="forms">Required Forms</TabsTrigger>
                  <TabsTrigger value="history">Filing History</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="forms" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <TaxFormList 
                    forms={taxFilingData?.taxForms || []}
                    isLoading={isLoading}
                    onUpload={handleFileUpload}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <TaxFilingHistory
                    history={taxFilingData?.history || []}
                    isLoading={isLoading}
                  />
                )}
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tax Liabilities</CardTitle>
            <CardDescription>Your current tax liabilities and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <TaxLiabilitiesCard
              liabilities={taxFilingData?.taxLiabilities}
              payments={taxFilingData?.payments}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TaxFiling;
