import { BrowserRouter } from "react-router"
import { LoginPage } from "./pages/LoginPage.jsx"
import { RegisterPage } from "./pages/RegisterPage.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AppRouter } from "./router/AppRoutes.jsx"

export const App = ()=>{
  return (
    <AppRouter />
  )
}