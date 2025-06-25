
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo purposes
const mockUsers: Record<string, User> = {
  'student@university.edu': {
    id: '1',
    name: 'John Student',
    email: 'student@university.edu',
    role: 'student',
    studentId: 'STU12345',
    department: 'Computer Science'
  },
  'faculty@university.edu': {
    id: '2',
    name: 'Dr. Sarah Professor',
    email: 'faculty@university.edu',
    role: 'faculty',
    department: 'Computer Science'
  },
  'finance@university.edu': {
    id: '3',
    name: 'Michael Finance',
    email: 'finance@university.edu',
    role: 'finance',
    department: 'Finance Department'
  },
  'admin@university.edu': {
    id: '4',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin',
    department: 'Administration'
  },
  'administration@university.edu': {
    id: '5',
    name: 'Lisa Administrator',
    email: 'administration@university.edu',
    role: 'administration',
    department: 'Academic Affairs'
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const mockUser = mockUsers[email];
    if (mockUser) {
      setUser(mockUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
