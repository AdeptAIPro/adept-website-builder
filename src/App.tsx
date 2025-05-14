
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TalentMatchmaking from "./pages/TalentMatchmaking";
import Compliance from "./pages/Compliance";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import PayrollDashboard from "./pages/PayrollDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import AddEmployee from "./pages/AddEmployee";
import Timesheets from "./pages/Timesheets";
import RunPayroll from "./pages/RunPayroll";
import DirectDeposit from "./pages/DirectDeposit";
import TaxFiling from "./pages/TaxFiling";
import PayrollReports from "./pages/PayrollReports";
import EmployeeSelfService from "./pages/EmployeeSelfService";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a client for react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000, // 30 seconds
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services" element={<Services />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/talent" 
              element={
                <ProtectedRoute>
                  <TalentMatchmaking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/compliance" 
              element={
                <ProtectedRoute>
                  <Compliance />
                </ProtectedRoute>
              } 
            />
            {/* Payroll routes */}
            <Route 
              path="/dashboard/payroll" 
              element={
                <ProtectedRoute>
                  <PayrollDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/payroll/employees" 
              element={
                <ProtectedRoute>
                  <EmployeeManagement />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/payroll/employees/new" 
              element={
                <ProtectedRoute>
                  <AddEmployee />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/payroll/timesheets" 
              element={
                <ProtectedRoute>
                  <Timesheets />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/payroll/run" 
              element={
                <ProtectedRoute>
                  <RunPayroll />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/payroll/direct-deposit" 
              element={
                <ProtectedRoute>
                  <DirectDeposit />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/payroll/tax-filing" 
              element={
                <ProtectedRoute>
                  <TaxFiling />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/payroll/reports" 
              element={
                <ProtectedRoute>
                  <PayrollReports />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/payroll/employee-self-service" 
              element={
                <ProtectedRoute>
                  <EmployeeSelfService />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
