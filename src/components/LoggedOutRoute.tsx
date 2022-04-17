import { useLogin } from 'hooks/context/user/userContext';
import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

export const LoggedOutRoute = () => {
  type LocationProps = {
    state: {
      from: Location;
    };
  };
  const location = useLocation() as unknown as LocationProps;
  const from = location.state?.from?.pathname || "/";
  const { isAuth } = useLogin();
  return !isAuth() ? (
    <Outlet />
  ) : (
    <Navigate to={from} state={{ from: location }} />
  );
};
