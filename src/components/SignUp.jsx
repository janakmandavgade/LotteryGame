import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function SignUp() {
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {

      const res = await axios.post(
        BACKEND_URL + "api/auth/register",
        { name, email, password, balance: 10000000 },
        {
          headers: {
            "x-api-key": API_KEY
          }
        }
      );

      console.log(res)
      setMsg("Account created successfully");

      e.target.reset();

    } catch (error) {

      setMsg(
        error.response?.data?.error || "Signup failed"
      );

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-center">Register</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Name"
            required
            className="border rounded px-3 py-2"
          />

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

          <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Register
          </button>
        </form>

        {msg && <p className="text-sm text-center mt-2 text-red-500">{msg}</p>}

        <p className="text-center mt-3 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 cursor-pointer">
                Login
            </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;