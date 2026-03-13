import { useState } from "react";
import api from "../api/api.js";
import newbg from '../assets/newbg.png'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");

    try {
      const res = await api.post(`/api/auth/login`, {
        email,
        password,
      });
      const role = res.data.user.role;

      if (role === "admin") window.location.href = "/admin";
      else if (role === "employee") window.location.href = "/dashboard";
      else if (role === "security") window.location.href = "/dashboard";
      else if (role === "visitor") window.location.href = "/profile";

    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");

    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${newbg})` }} >
      <div className="w-fit h-fit md:w-100 bg-[#111827] p-6 flex flex-col shadow-lg  rounded-lg">
        <h2 className="flex text-[#F9FAFB] font-extrabold mb-5 lg:text-2xl text-xl flex-col items-center ">Login</h2>
        <form onSubmit={handleLogin}>
          <span className="text-[#F9FAFB] text-sm mb-2 block">Email</span>
          <input
            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="text-[#F9FAFB] text-sm mb-2 block">Password</span>
          <input
            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="mt-2 mb-2 text-red-600">{error}</p>}
          <button className="bg-[#F59E0B] w-full text-white px-3  py-2 rounded-[50px] cursor-pointer" type="submit">Login</button>
        </form>
      </div>
    </div>

  );
};

export default Login;