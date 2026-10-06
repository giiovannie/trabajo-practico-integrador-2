import { StrictMode } from "react"
import { BrowserRouter } from "react-router"
import { LoginPage } from "./pages/LoginPage.jsx"

export const App = ()=>{
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  )
}