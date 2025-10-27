import { ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types';

interface RoleGuardProps {
  role: UserRole;
  children: ReactNode;
  fallback?: ReactNode;
}

export const RoleGuard = ({ role, children, fallback = null }: RoleGuardProps) => {
  const user = useAuthStore((state) => state.user);
  
  if (!user || user.role !== role) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};
