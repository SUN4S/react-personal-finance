import { Navigate, Outlet } from "react-router-dom";

import { useIsLoggedInQuery } from "../services/user";

// VERY BASIC check to verify user
const useAuth = () => {
  const loggedInQuery = useIsLoggedInQuery({});

  if (loggedInQuery.isSuccess) {
    return true;
  } else {
    return false;
  }
};

// Public routes for non-authenticated users
export const PublicRoutes = () => {
  const auth = useAuth();

  return auth ? <Navigate to="/" /> : <Outlet />;
};

// Private routes for authenticated users
export const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};
