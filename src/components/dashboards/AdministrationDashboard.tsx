
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Building, FileText, Clock } from 'lucide-react';

export const AdministrationDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Administration Dashboard</h2>
        <p className="text-gray-600">Coordinate graduation ceremonies and processes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ceremony Planning</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Spring 2024 Complete</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">Expected this semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Venues Booked</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Auditoriums reserved</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Urgent items</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Graduation Ceremonies</CardTitle>
            <CardDescription>Upcoming ceremony schedules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Spring Commencement 2024</h4>
                <Badge variant="default">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">May 15, 2024 - 10:00 AM</p>
              <p className="text-sm text-gray-600 mb-3">Main Auditorium - 432 graduates</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Edit Details</Button>
                <Button size="sm">View Attendees</Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Graduate Programs Ceremony</h4>
                <Badge variant="secondary">Planning</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">May 16, 2024 - 2:00 PM</p>
              <p className="text-sm text-gray-600 mb-3">Science Hall - 89 graduates</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Edit Details</Button>
                <Button size="sm">View Attendees</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Department Coordination</CardTitle>
            <CardDescription>Cross-department status updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Academic Records</p>
                  <p className="text-xs text-gray-500">Faculty approvals</p>
                </div>
              </div>
              <Badge variant="default">On Track</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Finance Department</p>
                  <p className="text-xs text-gray-500">Fee collections</p>
                </div>
              </div>
              <Badge variant="default">Complete</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Registrar Office</p>
                  <p className="text-xs text-gray-500">Diploma preparation</p>
                </div>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Administrative Tasks</CardTitle>
          <CardDescription>Manage graduation processes and coordination</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Ceremonies</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Manage Attendees</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Building className="h-6 w-6" />
              <span>Book Venues</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
