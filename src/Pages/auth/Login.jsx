import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth"; // hook from AuthContext

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // get login function from context
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/ProductList"); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={submit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Login
        </button>

        <p className="text-sm mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
        <p className="text-sm mt-1">
          Forgot password?{" "}
          <Link to="/forgot-password" className="text-red-600">
            Reset here
          </Link>
        </p>
      </form>
    </div>
  );
}
