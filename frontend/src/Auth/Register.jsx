import api from "../api/api";
import { useState } from 'react';
import newbg from '../assets/newbg.png'
import login from '../assets/login.webp'
import { NavLink, useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("visitor");

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post(`/api/auth/register`, {
                name: name,
                email: email,
                password: password,
                role: role,
            });
            toast.success(res.msg)
            navigate("/verify");

        } catch (err) {
            toast.error(err.response.data.msg)
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${newbg})` }}>
            <div className="flex flex-col lg:flex-row items-center gap-8 px-4">

                <div className="w-full max-w-md bg-[#111827] text-white p-8 rounded-2xl ">

                    <h1 className="text-3xl font-bold text-center">Create Account</h1>

                    <form className="mt-6 space-y-5" >
                        <div>
                            <label className="text-sm text-gray-400">Name</label>
                            <input
                                type='text'
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
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
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            />
                        </div>

                        <div >
                            <label className="text-sm  text-gray-400">Password</label>
                            <input
                                type='password'
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                                minLength={6}
                                maxLength={12}
                            />

                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Select Role</label>
                            <input
                                defaultValue={role}
                                className="w-full mt-1 px-4 py-2 bg-[#1F2937] rounded-lg text-white focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                                disabled
                            >
                            </input>
                        </div>

                        <button
                            onClick={handleRegister}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold shadow-md active:scale-95 transition disabled:opacity-60"
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