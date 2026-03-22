import api from "../api/api.js";
import { useState } from 'react';
import newbg from '../assets/newbg.png'
import login from '../assets/login.webp'
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handlerigster = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post(`/api/auth/register`, {
                name,
                email,
                password,
                role
            });

            navigate('/verify');

        } catch (err) {
            setError(err.response?.data?.msg || "Sign up failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${newbg})` }}>
            <div className="relative flex flex-col lg:flex-row items-center gap-8 px-4">

          
                <div className="hidden lg:block">
                    <img
                        className="h-150 rounded-2xl shadow-xl"
                        src={login}
                        alt="register"
                    />
                </div>

            
                <div className="w-full max-w-md bg-[#111827] text-white p-8 rounded-2xl shadow-2xl border border-white/10">

                    <h1 className="text-3xl font-bold text-center">Create Account</h1>
                    <p className="text-gray-400 text-sm text-center mt-1">
                        Join the system to continue
                    </p>

                    <form className="mt-6 space-y-5" onSubmit={handlerigster}>

                     
                        <div>
                            <label className="text-sm text-gray-400">Name</label>
                            <input
                                type='text'
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Email</label>
                            <input
                                type='email'
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
                                type='password'
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            />
                        </div>
                     
                        <div>
                            <label className="text-sm text-gray-400">Select Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            >
                                <option value="" disabled className="text-gray-400">
                                    -- Choose Role --
                                </option>
                                <option value="admin">Admin</option>
                                <option value="security">Security</option>
                                <option value="employee">Employee</option>
                                <option value="visitor">Visitor</option>
                            </select>
                        </div>

                      
                        {error && (
                            <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                                {error}
                            </p>
                        )}

                       
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-400 active:scale-95 transition disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Sign Up"}
                        </button>

                   
                        <p className="text-center text-gray-400 text-sm">
                            Already have an account?{" "}
                            <NavLink
                                to="/login"
                                className="text-[#F59E0B] hover:text-yellow-400 font-medium"
                            >
                                Login
                            </NavLink>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;