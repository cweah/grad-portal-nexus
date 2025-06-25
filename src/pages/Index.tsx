
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/LoginForm';
import { RoleSelector } from '@/components/RoleSelector';
import { StudentDashboard } from '@/components/dashboards/StudentDashboard';
import { FacultyDashboard } from '@/components/dashboards/FacultyDashboard';
import { FinanceDashboard } from '@/components/dashboards/FinanceDashboard';
import { AdministrationDashboard } from '@/components/dashboards/AdministrationDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'administration':
        return <AdministrationDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <RoleSelector />;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default Index;
