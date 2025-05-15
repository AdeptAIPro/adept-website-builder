
/**
 * Type definitions for compliance-related data
 */

export interface ComplianceStatus {
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

export interface Document {
  id: string;
  name: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  dueDate: string;
}

export interface ComplianceResponse {
  status: ComplianceStatus;
}

export interface DocumentsResponse {
  documents: Document[];
}
