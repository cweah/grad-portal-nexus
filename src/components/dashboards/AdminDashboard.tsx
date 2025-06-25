import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Settings, Shield, Activity, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AddUserDialog } from '@/components/AddUserDialog';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role_id: string;
  status: string;
  created_at: string;
  roles?: {
    name: string;
  };
}

interface SystemHealth {
  uptime_percent: number;
}

interface SecurityAlert {
  id: string;
  message: string;
  status: string;
  created_at: string;
}

interface DatabaseUsage {
  storage_used_gb: number;
}

interface BackupStatus {
  status: string;
  last_backup: string;
}

interface SystemAnalytics {
  daily_active_users: number;
  applications_processed: number;
  average_response_time: number;
  storage_usage_percent: number;
}

export const AdminDashboard = () => {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [databaseUsage, setDatabaseUsage] = useState<DatabaseUsage | null>(null);
  const [backupStatus, setBackupStatus] = useState<BackupStatus | null>(null);
  const [analytics, setAnalytics] = useState<SystemAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch users with role names
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select(`
          *,
          roles!inner(name)
        `)
        .limit(10);

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch system health
      const { data: healthData, error: healthError } = await supabase
        .from('system_health')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!healthError && healthData) {
        setSystemHealth(healthData);
      }

      // Fetch security alerts
      const { data: alertsData, error: alertsError } = await supabase
        .from('security_alerts')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (!alertsError) {
        setSecurityAlerts(alertsData || []);
      }

      // Fetch database usage
      const { data: dbUsageData, error: dbUsageError } = await supabase
        .from('database_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!dbUsageError && dbUsageData) {
        setDatabaseUsage(dbUsageData);
      }

      // Fetch backup status
      const { data: backupData, error: backupError } = await supabase
        .from('backup_status')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!backupError && backupData) {
        setBackupStatus(backupData);
      }

      // Fetch analytics
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('system_analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (!analyticsError && analyticsData) {
        setAnalytics(analyticsData);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600">System administration and user management</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemHealth?.uptime_percent ? `${Number(systemHealth.uptime_percent).toFixed(1)}%` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <Shield className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {databaseUsage?.storage_used_gb ? `${Number(databaseUsage.storage_used_gb).toFixed(1)}GB` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Storage used</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backup Status</CardTitle>
            <Settings className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backupStatus?.status === 'completed' ? '✓' : '⚠'}</div>
            <p className="text-xs text-muted-foreground">
              {backupStatus?.last_backup ? 
                `Last: ${new Date(backupStatus.last_backup).toLocaleDateString()}` : 
                'No backup data'
              }
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage system users and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <Button size="sm" onClick={fetchDashboardData}>Refresh Data</Button>
              <Button size="sm" variant="outline">Export Users</Button>
              <AddUserDialog onUserAdded={fetchDashboardData} />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                  <TableCell>{user.email || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.roles?.name || 'Unknown'}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status)} className="capitalize">
                      {user.status || 'unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Suspend</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Analytics</CardTitle>
            <CardDescription>Platform usage and performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Daily Active Users</span>
              <span className="font-bold">{analytics?.daily_active_users || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Applications Processed Today</span>
              <span className="font-bold">{analytics?.applications_processed || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Response Time</span>
              <span className="font-bold">
                {analytics?.average_response_time ? `${Number(analytics.average_response_time).toFixed(1)}s` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Storage Usage</span>
              <span className="font-bold">
                {analytics?.storage_usage_percent ? `${Number(analytics.storage_usage_percent).toFixed(0)}%` : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Management</CardTitle>
            <CardDescription>Administrative tools and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage User Roles
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="h-4 w-4 mr-2" />
                System Configuration
              </Button>
              <Button variant="outline" className="justify-start">
                <Database className="h-4 w-4 mr-2" />
                Database Management
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {securityAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Security Alerts</CardTitle>
            <CardDescription>Security issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(alert.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="secondary">{alert.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
