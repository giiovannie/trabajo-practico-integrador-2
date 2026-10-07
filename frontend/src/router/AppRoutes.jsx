import { BrowserRouter, Routes, Route } from "react-router"
import { HomePage } from "../pages/HomePage.jsx"
import { LoginPage } from "../pages/LoginPage.jsx"
import { RegisterPage } from "../pages/RegisterPage.jsx"
import { PrivateRoutes } from "./PrivateRoutes.jsx"
import { PublicRoutes } from "./PublicRoutes.jsx"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>

      //esta ruta es para redirigir a la pagina de login si el usuario no esta logueado y quiere acceder a una ruta que no existe, o si el usuario esta logueado y quiere acceder a una ruta que no existe, lo redirige a home
      <Route
      path="*"
      element={
        localStorage.getItem("isLogged") === "true"
          ? <Navigate to="/home" />
          : <Navigate to="/login" />
      }
    />
    </BrowserRouter>
  )
}