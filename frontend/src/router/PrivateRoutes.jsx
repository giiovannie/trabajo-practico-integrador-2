import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem("isLogged");

  return isAuthenticated === "true" ? <Outlet /> : <Navigate to="/login" />;
};
