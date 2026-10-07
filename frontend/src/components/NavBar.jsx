import { Link,useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async() => {
    localStorage.removeItem("isLogged");
    navigate("/login");
  }

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold">Bienvenido</h2>
      <ul className="flex items-center gap-4">
        <li>
          <Link to="/home" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            type="button"
            className="bg-white text-blue-600 rounded px-3 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
