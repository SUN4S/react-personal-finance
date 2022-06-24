import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

// Public routes for non-authenticated users
export const PublicRoutes = () => {
  const { getStatus } = useAuth();
  const auth = getStatus();

  return auth ? <Navigate to="/" /> : <Outlet />;
};

// Private routes for authenticated users
export const ProtectedRoutes = () => {
  const { getStatus } = useAuth();
  const auth = getStatus();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};
