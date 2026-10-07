import { Navigate, Outlet } from "react-router"

export const PublicRoutes = () => {
    const isAuthenticated = localStorage.getItem("isLogged");

    return isAuthenticated === "true" ? <Navigate to="/home" /> : <Outlet />;
}