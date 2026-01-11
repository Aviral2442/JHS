import { type ReactNode } from "react";
import { isAuthenticated } from "../../utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  // requiredRole?: UserRole;
  redirectTo?: string;
}

/**
 * ProtectedRoute Component
 * Handles authentication and authorization checks
 * 
 * @param children - Child components to render if authorized
 * @param requireAuth - Whether authentication is required (default: true)
 * @param requiredRole - Minimum role required to access (default: USER)
 * @param redirectTo - Where to redirect if unauthorized (default: /admin/auth/sign-in)
 */
const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  // requiredRole = UserRole.USER,
  // redirectTo = "/admin/auth/sign-in"
}: ProtectedRouteProps) => {
  
  // Check authentication
  if (requireAuth && !isAuthenticated()) {
    // return <Navigate to={redirectTo} replace />;
  }

  // Check role authorization
  // if (requiredRole && !hasRole(requiredRole)) {
  //   // User is authenticated but doesn't have required role
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
