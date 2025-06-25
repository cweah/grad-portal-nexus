
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types/user';
import { GraduationCap, Users, DollarSign, Building, Shield } from 'lucide-react';

const roleIcons = {
  student: GraduationCap,
  faculty: Users,
  finance: DollarSign,
  administration: Building,
  admin: Shield
};

const roleDescriptions = {
  student: 'Apply for graduation, track status, upload documents',
  faculty: 'Review applications, approve graduation requirements',
  finance: 'Manage graduation fees and financial clearances',
  administration: 'Coordinate ceremonies and departmental processes',
  admin: 'System administration and user management'
};

export const RoleSelector = () => {
  const { user, switchRole } = useAuth();
  
  if (!user) return null;

  const roles: UserRole[] = ['student', 'faculty', 'finance', 'administration', 'admin'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Role</h2>
        <p className="text-gray-600">Choose your role to access the appropriate dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = roleIcons[role];
          return (
            <Card key={role} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Icon className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                <CardTitle className="capitalize">{role}</CardTitle>
                <CardDescription className="text-sm">
                  {roleDescriptions[role]}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => switchRole(role)}
                  variant={user.role === role ? "default" : "outline"}
                >
                  {user.role === role ? "Current Role" : "Switch to Role"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
