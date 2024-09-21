import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@auth/hooks';
import paths from './paths';

const { LOGIN_PATH } = paths;

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_PATH} replace />;
};

export default PrivateRoute;
