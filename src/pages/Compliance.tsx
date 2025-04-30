
import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { complianceApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ComplianceStatus {
  overallScore: number;
  sections: {
    [key: string]: {
      score: number;
      status: 'compliant' | 'warning' | 'non-compliant';
      items: Array<{
        name: string;
        status: 'compliant' | 'warning' | 'non-compliant';
        dueDate?: string;
      }>;
    };
  };
}

interface Document {
  id: string;
  name: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  dueDate: string;
}

const Compliance: React.FC = () => {
  const [status, setStatus] = useState<ComplianceStatus | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // These calls would go to AWS Lambda in production
        const [statusResponse, documentsResponse] = await Promise.all([
          complianceApi.getComplianceStatus(),
          complianceApi.getRequiredDocuments()
        ]);
        
        if (statusResponse.data) {
          setStatus(statusResponse.data.status);
        }
        
        if (documentsResponse.data) {
          setDocuments(documentsResponse.data.documents);
        }
      } catch (error) {
        console.error("Failed to load compliance data:", error);
        toast({
          title: "Error loading data",
          description: "Failed to load compliance data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Fallback to demo data if API call fails
    setTimeout(() => {
      if (isLoading) {
        setStatus(demoStatus);
        setDocuments(demoDocuments);
        setIsLoading(false);
      }
    }, 2000);
  }, []);
  
  // Demo data for development purposes
  const demoStatus: ComplianceStatus = {
    overallScore: 85,
    sections: {
      "Documentation": {
        score: 90,
        status: "compliant",
        items: [
          { name: "Privacy Policy", status: "compliant" },
          { name: "Terms of Service", status: "compliant" },
          { name: "Data Processing Agreement", status: "compliant" }
        ]
      },
      "Data Handling": {
        score: 75,
        status: "warning",
        items: [
          { name: "Data Retention Policy", status: "warning", dueDate: "2025-05-15" },
          { name: "Data Access Controls", status: "compliant" },
          { name: "Data Encryption", status: "warning", dueDate: "2025-05-10" }
        ]
      },
      "Worker Classification": {
        score: 65,
        status: "warning",
        items: [
          { name: "Contractor Agreements", status: "non-compliant", dueDate: "2025-05-01" },
          { name: "Employee Classification", status: "warning", dueDate: "2025-05-20" }
        ]
      }
    }
  };
  
  const demoDocuments: Document[] = [
    {
      id: "1",
      name: "Privacy Policy",
      category: "Legal",
      status: "approved",
      dueDate: "2024-12-31"
    },
    {
      id: "2",
      name: "Data Processing Agreement",
      category: "Legal",
      status: "approved",
      dueDate: "2024-12-31"
    },
    {
      id: "3",
      name: "Contractor Agreement Template",
      category: "HR",
      status: "pending",
      dueDate: "2025-05-01"
    },
    {
      id: "4",
      name: "Data Retention Policy",
      category: "Security",
      status: "pending",
      dueDate: "2025-05-15"
    }
  ];
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'non-compliant':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const getStatusColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-red-500";
  };
  
  if (isLoading) {
    return <div className="container mx-auto py-6">Loading compliance data...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your regulatory compliance</p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Run Compliance Scan
        </Button>
      </div>
      
      {status && (
        <div className="mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Overall Compliance Score</CardTitle>
              <span className="text-2xl font-bold">{status.overallScore}%</span>
            </CardHeader>
            <CardContent>
              <Progress value={status.overallScore} className={getStatusColor(status.overallScore)} />
              <p className="mt-2 text-sm text-muted-foreground">
                {status.overallScore >= 90 
                  ? "Your organization is largely compliant with regulations." 
                  : status.overallScore >= 70
                    ? "Your organization has some compliance issues that need attention."
                    : "Your organization has significant compliance issues that require immediate attention."}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {status && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(status.sections).map(([name, section]) => (
            <Card key={name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">{name}</CardTitle>
                <div className="flex items-center">
                  {getStatusIcon(section.status)}
                  <span className="ml-2 font-bold">{section.score}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(item.status)}
                        <span className="ml-2">{item.name}</span>
                      </div>
                      {item.dueDate && (
                        <span className="text-xs text-muted-foreground">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4">Required Documents</h2>
      <div className="overflow-hidden rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Document</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Due Date</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(doc.status)}
                      <span className="ml-2 capitalize">{doc.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(doc.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">No documents found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compliance;
