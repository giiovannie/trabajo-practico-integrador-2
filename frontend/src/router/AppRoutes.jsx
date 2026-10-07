import { BrowserRouter, Routes, Route } from "react-router"
import { HomePage } from "../pages/HomePage.jsx"
import { LoginPage } from "../pages/LoginPage.jsx"
import { RegisterPage } from "../pages/RegisterPage.jsx"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}