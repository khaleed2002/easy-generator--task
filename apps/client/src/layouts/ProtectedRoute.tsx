import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/sign-in" replace />;

  return <Outlet />;
};
