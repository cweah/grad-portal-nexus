
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

interface AddUserDialogProps {
  onUserAdded: () => void;
}

interface Role {
  id: string;
  name: string;
}

export const AddUserDialog = ({ onUserAdded }: AddUserDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      console.log('Fetching roles from Supabase...');
      const { data, error } = await supabase
        .from('roles')
        .select('id, name');

      if (error) {
        console.error('Error fetching roles:', error);
        throw error;
      }
      
      console.log('Fetched roles:', data);
      setRoles(data || []);

      // If no roles exist, create default ones
      if (!data || data.length === 0) {
        console.log('No roles found, creating default roles...');
        await createDefaultRoles();
      }
    } catch (error) {
      console.error('Error in fetchRoles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch roles",
        variant: "destructive",
      });
    }
  };

  const createDefaultRoles = async () => {
    try {
      const defaultRoles = [
        { name: 'admin' },
        { name: 'faculty' },
        { name: 'student' },
        { name: 'finance' },
        { name: 'administration' }
      ];

      console.log('Creating default roles:', defaultRoles);
      const { data, error } = await supabase
        .from('roles')
        .insert(defaultRoles)
        .select();

      if (error) {
        console.error('Error creating default roles:', error);
        throw error;
      }
      
      console.log('Created default roles:', data);
      setRoles(data || []);
    } catch (error) {
      console.error('Error in createDefaultRoles:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Form data:', { name, email, roleId, status });
    
    if (!name || !email || !roleId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      console.log('Inserting user with data:', {
        name,
        email,
        role_id: roleId,
        status,
        created_at: new Date().toISOString(),
      });

      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            name,
            email,
            role_id: roleId,
            status,
            created_at: new Date().toISOString(),
          }
        ])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('User inserted successfully:', data);

      toast({
        title: "Success",
        description: "User added successfully",
      });

      // Reset form
      setName('');
      setEmail('');
      setRoleId('');
      setStatus('active');
      setOpen(false);
      
      // Refresh the user list
      onUserAdded();

    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: `Failed to add user: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role * ({roles.length} roles available)</Label>
            <Select value={roleId} onValueChange={setRoleId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
