import React from 'react'
import api from "../api/api.js";
import { useState } from 'react';
import newbg from '../assets/newbg.png'
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Adminregister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            await api.post("/api/auth/register/admin", formData);
            navigate("/verify");

        } catch (err) {
            toast.error(err.response?.data?.msg || "Sign up failed");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${newbg})` }}>
            <div className="relative flex flex-col lg:flex-row items-center gap-8 px-4">

                <div className="w-full max-w-md bg-[#111827] text-white p-8 rounded-2xl shadow-2xl border border-white/10">

                    <h1 className="text-3xl font-bold text-center">Create Admin Account</h1>
                    <p className="text-gray-400 text-sm text-center mt-1">
                        Welcome to visi.co admin page
                    </p>

                    <form className="mt-6 space-y-5" onSubmit={handlesubmit} >

                        <div>
                            <label className="text-sm text-gray-400">Name</label>
                            <input
                                type='text'
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e)=>setFormdata({...formData,name:e.target.value})}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Email</label>
                            <input
                                type='email'
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e)=>setFormdata({...formData,email:e.target.value})}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Password</label>
                            <input
                                type='password'
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e)=>setFormdata({...formData,password:e.target.value})}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Select Role</label>
                            <select
                                value={formData.role}
                                onChange={(e)=>setFormdata({...formData,role:e.target.value})}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            >
                                <option value="" disabled className="text-gray-400">
                                    -- Choose Role --
                                </option>
                                <option value="admin">admin</option>
                            </select>
                        </div>

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
    )
}

export default Adminregister