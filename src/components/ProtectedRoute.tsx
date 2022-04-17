import { useLogin } from 'hooks/context/user/userContext';
import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

export const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuth } = useLogin();
  return isAuth() ? (
    <Outlet />
  ) : (
    <Navigate to={"login"} state={{ from: location }} />
  );
};
