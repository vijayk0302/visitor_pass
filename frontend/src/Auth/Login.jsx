import { useState } from "react";
import api from "../api/api.js";
import newbg from '../assets/newbg.png'
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post(`/api/auth/login`, {
        email,
        password,
      });

      const role = res.data.user.role;

      if (role === "admin") window.location.href = "/admin";
      else window.location.href = "/profile";

    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="flex items-center px-5 justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${newbg})` }}>


      <div className="relative w-full max-w-md bg-[#111827] text-white p-8 rounded-2xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-400 text-sm text-center mt-1">Login to your account</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-5">

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
              required
            />
          </div>


          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
              required
            />
          </div>


          {/* {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )} */}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-400 active:scale-95 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>


          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-[#F59E0B] hover:text-yellow-400 font-medium"
            >
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;