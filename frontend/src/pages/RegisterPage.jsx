import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useState } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const {username, email, password} = useForm;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

        setLoading(true)
        setErrors(null)

    setTimeout(()=>{
        setLoading(false)
        setErrors("credenciales incorrectas")
        errors
    },800)

    console.log(useForm);
  };

  return (
    <>
      <h1>Registro</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          name="usernames"
          onChange={handleInputChange}
          type="text"
          placeholder="username"
          value={username} />
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
        <button type="submit">
            {loading ? 'enviando...' : "register"}
        </button>

        {errors && <p>{error}</p>}
      </form>
    </>
  );
};
