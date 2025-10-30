import { Navigate } from "react-router-dom";
import Loader from "../components/UI/Loader";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) return <Loader />;

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
