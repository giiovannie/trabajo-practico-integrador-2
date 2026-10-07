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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Registro</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              id="username"
              name="username"
              onChange={handleInputChange}
              type="text"
              placeholder="username"
              value={username}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              onChange={handleInputChange}
              type="email"
              value={email}
              placeholder="JhonDoe123@gmail.com"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              onChange={handleInputChange}
              type="password"
              value={password}
              placeholder="Contraseña"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="first_name"
              className="text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="first_name"
              name="first_name"
              onChange={handleInputChange}
              type="text"
              value={first_name}
              placeholder="Nombre"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="last_name"
              className="text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <input
              id="last_name"
              name="last_name"
              onChange={handleInputChange}
              type="text"
              value={last_name}
              placeholder="Apellido"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="biography"
              className="text-sm font-medium text-gray-700"
            >
              Biografía
            </label>
            <textarea
              id="biography"
              name="biography"
              onChange={handleInputChange}
              value={biography}
              placeholder="Contanos algo sobre vos"
              rows={3}
              className="border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="avatar_url"
              className="text-sm font-medium text-gray-700"
            >
              URL del avatar
            </label>
            <input
              id="avatar_url"
              name="avatar_url"
              onChange={handleInputChange}
              type="url"
              value={avatar_url}
              placeholder="https://..."
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="birth_date"
              className="text-sm font-medium text-gray-700"
            >
              Fecha de nacimiento
            </label>
            <input
              id="birth_date"
              name="birth_date"
              onChange={handleInputChange}
              type="date"
              value={birth_date}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            {errors.map((err) => (
              <p key={err} className="text-red-600 text-sm">
                {err}
              </p>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "enviando..." : "register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
