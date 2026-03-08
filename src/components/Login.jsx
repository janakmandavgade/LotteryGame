import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function Login() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(
        BACKEND_URL + "api/auth/login",
        { email, password },
        {
          headers: {
            "x-api-key": API_KEY
          }
        }
      );

      console.log(res.data)
      const { token, user } = res.data;

      // store JWT
      localStorage.setItem("token", token);

      // store user
      localStorage.setItem("currentUser", JSON.stringify(user));

      setMsg(`Welcome ${user.name}`);

      navigate("/game");

    } catch (error) {

      setMsg(error.response?.data?.error || "Login failed");

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border rounded px-3 py-2"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="border rounded px-3 py-2"
          />

          <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>

        {msg && <p className="text-sm text-center mt-2 text-red-500">{msg}</p>}

        <p className="text-center mt-3 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 cursor-pointer">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;