import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

export const PublicOnlyRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};
