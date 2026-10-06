import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useState } from "react";

export const LoginPage = () => {
  const navigate = useNavigate(); // <- esto es un hook , reemplaza a link y permite navegar despues del login

  const [loading, setLoading] = useState(false);
  //nota-> aca manejamos un unico error que nos puede devolver el backend a diferencia del register que puede devolver varios en un array
  const [error, setError] = useState(null); // -> puse null porque no hay errores como inicio

  const {formState, handleInputChange} = useForm({
    username: "",
    password: "",
  });

  const {username, password} = formState

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);

    setLoading(true)
    setError(null)

    setTimeout(()=>{
        setError("credenciales incorrectas")
        setLoading(false)
    },800)

  };

  return (
    <>
      <h1>Inicio de sesion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="UserName"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          id=""
          value={password}
          placeholder="Contraseña"
          onChange={handleInputChange}
        />
        {error && <p>{error}</p>}
        <button type="submit">
            {loading ? "cargando.." : "enviar"}
        </button>

        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </form>
    </>
  );
};
