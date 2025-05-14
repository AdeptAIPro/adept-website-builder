
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  Check,
  AlertCircle,
  Plus,
  Trash,
  ExternalLink,
  Lock,
  BanknoteIcon,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { payrollApi } from '@/services/api/payroll';
import { toast } from '@/hooks/use-toast';

const DirectDeposit: React.FC = () => {
  const navigate = useNavigate();
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);
  const [plaidConnecting, setPlaidConnecting] = useState(false);

  // Fetch direct deposit data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['directDeposit'],
    queryFn: () => payrollApi.getDirectDepositData(),
  });

  // Process payouts mutation
  const processPayoutsMutation = useMutation({
    mutationFn: (payoutIds: string[]) => payrollApi.processBulkPayouts(payoutIds),
    onSuccess: () => {
      toast({
        title: 'Payouts Processed',
        description: 'The selected payouts have been successfully processed.',
      });
      setSelectedPayouts([]);
      refetch();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to process payouts',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

  // Add bank account mutation
  const addBankAccountMutation = useMutation({
    mutationFn: (accountData: any) => payrollApi.addBankAccount(accountData),
    onSuccess: () => {
      toast({
        title: 'Bank Account Added',
        description: 'The bank account has been successfully added.',
      });
      setIsAddBankOpen(false);
      refetch();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to add bank account',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

  const handleTogglePayout = (payoutId: string) => {
    if (selectedPayouts.includes(payoutId)) {
      setSelectedPayouts(selectedPayouts.filter(id => id !== payoutId));
    } else {
      setSelectedPayouts([...selectedPayouts, payoutId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPayouts.length === data?.pendingPayouts.length) {
      setSelectedPayouts([]);
    } else {
      setSelectedPayouts(data?.pendingPayouts.map(payout => payout.id) || []);
    }
  };

  const handleProcessPayouts = () => {
    if (selectedPayouts.length > 0) {
      processPayoutsMutation.mutate(selectedPayouts);
    }
  };

  const handleConnectWithPlaid = () => {
    setPlaidConnecting(true);
    // Simulating Plaid integration - would be replaced with actual Plaid Link integration
    setTimeout(() => {
      const mockAccountData = {
        accountId: 'plaid_' + Math.random().toString(36).substr(2, 9),
        accountName: 'Company Payroll Account',
        accountType: 'checking',
        routingNumber: '123456789',
        accountNumber: 'XXXX5678',
        bankName: 'Acme Bank',
        isVerified: true,
      };
      
      addBankAccountMutation.mutate(mockAccountData);
      setPlaidConnecting(false);
    }, 2000);
  };

  const handleManuallyAddAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const accountData = {
      accountName: formData.get('accountName') as string,
      accountType: formData.get('accountType') as string,
      routingNumber: formData.get('routingNumber') as string,
      accountNumber: formData.get('accountNumber') as string,
      bankName: formData.get('bankName') as string,
      isVerified: false,
    };
    
    addBankAccountMutation.mutate(accountData);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load direct deposit data. Please try again.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  const { pendingPayouts, bankAccounts } = data || { pendingPayouts: [], bankAccounts: [] };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard/payroll')} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Direct Deposit</h1>
            <p className="text-muted-foreground">
              Manage employee payments and bank accounts
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bankAccounts.map((account: any) => (
            <Card key={account.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{account.bankName}</CardTitle>
                  {account.isVerified && (
                    <Badge className="bg-green-500">Verified</Badge>
                  )}
                </div>
                <CardDescription>{account.accountName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Account Type</span>
                    <span className="text-sm font-medium capitalize">{account.accountType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Routing Number</span>
                    <span className="text-sm font-medium">{account.routingNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Account Number</span>
                    <span className="text-sm font-medium">{account.accountNumber}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <Button variant="outline" className="w-full" size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Manage Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-muted/50 border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Add Payment Method</CardTitle>
              <CardDescription>Connect a new bank account</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="rounded-full bg-primary/10 p-3">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <Dialog open={isAddBankOpen} onOpenChange={setIsAddBankOpen}>
                <DialogTrigger asChild>
                  <Button>Add Bank Account</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Bank Account</DialogTitle>
                    <DialogDescription>
                      Connect a bank account for processing direct deposits
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="bg-muted/50 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Connect with Plaid</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Securely connect your bank account with Plaid
                          </p>
                        </div>
                        <Button 
                          onClick={handleConnectWithPlaid}
                          disabled={plaidConnecting}
                        >
                          {plaidConnecting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <ExternalLink className="mr-2 h-4 w-4" />
                          )}
                          Connect
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or enter manually
                        </span>
                      </div>
                    </div>
                    <form onSubmit={handleManuallyAddAccount}>
                      <div className="grid gap-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="bankName">Bank Name</Label>
                            <Input id="bankName" name="bankName" placeholder="Chase, Wells Fargo, etc." required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="accountName">Account Name</Label>
                            <Input id="accountName" name="accountName" placeholder="Payroll Account" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountType">Account Type</Label>
                          <select 
                            id="accountType" 
                            name="accountType"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          >
                            <option value="checking">Checking</option>
                            <option value="savings">Savings</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="routingNumber">Routing Number</Label>
                            <Input id="routingNumber" name="routingNumber" placeholder="123456789" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="accountNumber">Account Number</Label>
                            <Input id="accountNumber" name="accountNumber" placeholder="987654321" required />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="rounded-full bg-primary/10 p-1">
                            <Lock className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Your banking information is encrypted and secure
                          </span>
                        </div>
                      </div>
                      <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsAddBankOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={addBankAccountMutation.isPending}>
                          {addBankAccountMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            'Add Account'
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Pending Payouts</CardTitle>
                <CardDescription>
                  Process employee direct deposit payments
                </CardDescription>
              </div>
              <Button
                onClick={handleProcessPayouts}
                disabled={selectedPayouts.length === 0 || processPayoutsMutation.isPending}
              >
                {processPayoutsMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <BanknoteIcon className="mr-2 h-4 w-4" />
                    Process {selectedPayouts.length} Payouts
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {pendingPayouts.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/20 p-8 text-center">
                <BanknoteIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No pending payouts</h3>
                <p className="text-sm text-muted-foreground">
                  All employee payments have been processed
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                            checked={selectedPayouts.length === pendingPayouts.length && pendingPayouts.length > 0}
                            onChange={handleSelectAll}
                          />
                        </div>
                      </TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPayouts.map((payout: any) => (
                      <TableRow key={payout.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                              checked={selectedPayouts.includes(payout.id)}
                              onChange={() => handleTogglePayout(payout.id)}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{payout.employeeName}</div>
                          <div className="text-xs text-muted-foreground">{payout.employeeId}</div>
                        </TableCell>
                        <TableCell>{payout.paymentDate}</TableCell>
                        <TableCell className="font-medium">${payout.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span>{payout.bankName} (****{payout.accountLast4})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Pending</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DirectDeposit;
