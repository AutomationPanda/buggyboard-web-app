import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * If not authenticated, redirect to /login.
 * If authenticated and path is /login, redirect to /board (handled in App via redirect route).
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
