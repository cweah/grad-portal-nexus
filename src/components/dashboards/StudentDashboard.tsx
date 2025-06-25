
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Upload, DollarSign, Calendar, CheckCircle } from 'lucide-react';

export const StudentDashboard = () => {
  const applicationStatus = 'under_review';
  const completionPercentage = 75;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Student Dashboard</h2>
        <p className="text-gray-600">Track your graduation application progress</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Application Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={applicationStatus === 'approved' ? 'default' : 'secondary'} className="capitalize">
              {applicationStatus.replace('_', ' ')}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <Progress value={completionPercentage} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduation Fee</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$350</div>
            <Badge variant="destructive" className="mt-1">Due Soon</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ceremony Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">May 15, 2024</div>
            <p className="text-xs text-muted-foreground">Spring Commencement</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Progress</CardTitle>
            <CardDescription>Complete all requirements for graduation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Personal Information</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Academic Records</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Document Upload</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Fee Payment</span>
              <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Faculty Approval</span>
              <div className="h-5 w-5 rounded-full border-2 border-yellow-400 bg-yellow-100" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>Upload and verify your documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Transcript</p>
                    <p className="text-xs text-gray-500">Official transcript required</p>
                  </div>
                </div>
                <Badge variant="default">Verified</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Thesis</p>
                    <p className="text-xs text-gray-500">Final thesis document</p>
                  </div>
                </div>
                <Badge variant="default">Verified</Badge>
              </div>
              
              <Button className="w-full" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Additional Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for graduation application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col space-y-2">
              <DollarSign className="h-6 w-6" />
              <span>Pay Graduation Fee</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Upload className="h-6 w-6" />
              <span>Upload Documents</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Appointment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
