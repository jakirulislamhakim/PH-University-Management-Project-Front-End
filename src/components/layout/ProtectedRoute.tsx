import { ReactNode } from 'react';
import { currentUserToken } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentUserToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;