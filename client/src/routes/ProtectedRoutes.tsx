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

export const ProtectedRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};
