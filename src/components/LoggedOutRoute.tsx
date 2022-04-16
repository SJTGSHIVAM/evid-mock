import { useLogin } from 'hooks/context/user/userContext';
import {
  Navigate,
  Outlet,
} from 'react-router-dom';

export const LoggedOutRoute = () => {
  const { isAuth } = useLogin();
  return !isAuth() ? <Outlet /> : <Navigate to={"/"} />;
};
