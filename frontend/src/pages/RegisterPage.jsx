import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useState } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    biography: "",
    avatar_url: "",
    birth_date: "",
  });

  const {
    username,
    email,
    password,
    first_name,
    last_name,
    biography,
    avatar_url,
    birth_date,
  } = formState;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    setErrors([]);

    setTimeout(() => {
      setLoading(false);
      setErrors(["El email no es válido", "La contraseña es muy corta"]);
    }, 800);
  };

  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleInputChange}
          type="text"
          placeholder="username"
          value={username}
        />
        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          value={email}
          placeholder="JhonDoe123@gmail.com"
        />
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          value={password}
          placeholder="1234abc%#$"
        />
        <input
          name="first_name"
          onChange={handleInputChange}
          type="text"
          value={first_name}
          placeholder="Nombre"
        />
        <input
          name="last_name"
          onChange={handleInputChange}
          type="text"
          value={last_name}
          placeholder="Apellido"
        />
        <textarea
          name="biography"
          onChange={handleInputChange}
          value={biography}
          placeholder="Biografía"
        />
        <input
          name="avatar_url"
          onChange={handleInputChange}
          type="url"
          value={avatar_url}
          placeholder="URL de tu avatar"
        />
        <input
          name="birth_date"
          onChange={handleInputChange}
          type="date"
          value={birth_date}
        />

        {errors.map((err) => (
          <p key={err}>{err}</p>
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "enviando..." : "register"}
        </button>
      </form>

      <p>
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </>
  );
};