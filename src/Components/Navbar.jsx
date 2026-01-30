import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; 

export default function Navbar() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">MyApp</Link>
      </div>

      <div className="space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:bg-blue-500 px-3 py-1 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:bg-blue-500 px-3 py-1 rounded transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
