import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // matches AuthContext.js

export default function RequireAuth({ children }) {
  const { user } = useAuth();

  // If user is not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Otherwise, render the protected component
  return children;
}
