import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // ✅ Show loading state while checking token
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">
      Loading...
    </div>;
  }

  // ✅ If user is not logged in after loading, redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
