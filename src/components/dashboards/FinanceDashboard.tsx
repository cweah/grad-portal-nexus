
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, CreditCard, AlertTriangle, TrendingUp } from 'lucide-react';

export const FinanceDashboard = () => {
  const pendingPayments = [
    { id: 1, student: 'John Student', amount: 350, dueDate: '2024-02-15', status: 'overdue' },
    { id: 2, student: 'Sarah Johnson', amount: 350, dueDate: '2024-02-20', status: 'pending' },
    { id: 3, student: 'Mike Wilson', amount: 350, dueDate: '2024-02-25', status: 'pending' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Finance Dashboard</h2>
        <p className="text-gray-600">Manage graduation fees and financial clearances</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$64,750</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,750</div>
            <p className="text-xs text-muted-foreground">25 students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,750</div>
            <p className="text-xs text-muted-foreground">5 students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">On-time payments</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Payment Activities</CardTitle>
          <CardDescription>Track graduation fee payments and clearances</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.student}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === 'overdue' ? 'destructive' : 'secondary'} className="capitalize">
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Send Reminder</Button>
                      <Button size="sm">Mark Paid</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>Current semester overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Fees Collected</span>
              <span className="font-bold">$64,750</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Outstanding Amount</span>
              <span className="font-bold text-yellow-600">$8,750</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Overdue Amount</span>
              <span className="font-bold text-red-600">$1,750</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Processing Fees</span>
              <span className="font-bold">$1,295</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common finance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button className="justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Generate Payment Report
              </Button>
              <Button variant="outline" className="justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Process Refunds
              </Button>
              <Button variant="outline" className="justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Send Payment Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
