import { BrowserRouter } from "react-router"
import { LoginPage } from "./pages/LoginPage.jsx"
import { RegisterPage } from "./pages/RegisterPage.jsx"
import { HomePage } from "./pages/HomePage.jsx"

export const App = ()=>{
  return (
    <BrowserRouter>
      {/* <LoginPage />
      <RegisterPage/> */}
      <HomePage />
    </BrowserRouter>
  )
}