import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!token) {
    // Redirect to login but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Role not authorized, redirect to their default dashboard or landing
    const defaultDash =
      user.role === "STUDENT"
        ? "/student/dashboard"
        : user.role === "STAFF"
          ? "/staff/dashboard"
          : "/admin/dashboard";
    return <Navigate to={defaultDash} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
