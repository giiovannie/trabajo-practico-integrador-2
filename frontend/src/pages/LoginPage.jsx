import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useState } from "react";

export const LoginPage = () => {
  const navigate = useNavigate(); // <- esto es un hook , reemplaza a link y permite navegar despues del login

  const [loading, setLoading] = useState(false);
  //nota-> aca manejamos un unico error que nos puede devolver el backend a diferencia del register que puede devolver varios en un array
  const [error, setError] = useState(null); // -> puse null porque no hay errores como inicio

  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formState;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    setLoading(true);
    setError(null);

    try{
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesion");
      }

      const data = await response.json();
      console.log(data);

      localStorage.setItem("isLogged", "true");
      navigate("/home");
      
    }catch(error){
      setError(error.message || "Error al iniciar sesion");
    }finally{
      setLoading(false);
    } 
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Inicio de sesion</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              className="border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              value={password}
              placeholder="Contraseña"
              onChange={handleInputChange}
            />
            {error && <p className="text-red-600">{error}</p>}
            <button className="bg-blue-600 min-w rounded text-white"  type="submit">{loading ? "cargando.." : "enviar"}</button>
            <p className="mt-4 text-sm text-center">¿No tenés cuenta? <Link to="/register" className="text-blue-600 hover:underline">Registrate</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};
