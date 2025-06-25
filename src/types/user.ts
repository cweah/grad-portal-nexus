
export type UserRole = 'student' | 'faculty' | 'finance' | 'administration' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  studentId?: string;
  avatar?: string;
}

export interface GraduationApplication {
  id: string;
  studentId: string;
  studentName: string;
  degree: string;
  major: string;
  expectedGraduation: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'completed';
  submittedDate: string;
  documents: Document[];
  fees: {
    amount: number;
    paid: boolean;
    dueDate: string;
  };
  facultyApproval?: boolean;
  financeApproval?: boolean;
  adminApproval?: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  verified: boolean;
}
