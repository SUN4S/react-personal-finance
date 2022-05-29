import { Navigate, Outlet } from "react-router-dom";

import { useIsLoggedInQuery } from "../services/user";

const useAuth = () => {
  const loggedInQuery = useIsLoggedInQuery({});

  if (loggedInQuery.isSuccess) {
    return true;
  } else {
    return false;
  }
};

const PublicRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
