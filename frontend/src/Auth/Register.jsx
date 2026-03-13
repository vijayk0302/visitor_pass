import api from "../api/api.js";
import { useState } from 'react';
import newbg from '../assets/newbg.png'
import login from '../assets/login.webp'
import { NavLink } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    const handlerigster = async (e) => {
        e.preventDefault()
        setError("");

        try {
            const res = await api.post(`/api/auth/register`, {
                name,
                email,
                password,
                role
            });
            window.location.href = "/login";

        } catch (err) {
            setError(err.response?.data?.msg || "sign up failed");

        }

    }


    return (
        <div style={{ backgroundImage: `url(${newbg})` }} className="bg-cover bg-center bg-fixed">
            <div className='min-h-screen flex-col space-x-7 flex lg:flex-row justify-center items-center px-4 rounded py-3'>
                <div>
                    <img className="lg:size-150 rounded" src={login} alt="" />

                </div>
                <div className='w-full md:w-100 px-5 py-4 rounded-lg bg-[#111827]'>
                    <h1 className='text-center font-extrabold text-xl text-[#F9FAFB]'>Sign Up</h1>
                    <form className='mt-6' onSubmit={handlerigster}>
                        <span className="text-[#F9FAFB] text-sm mb-2 block">Name</span>
                        <input
                            type='text'
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <span className="text-[#F9FAFB] text-sm mb-2 block">Email</span>
                        <input
                            type='email'
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <span className="text-[#F9FAFB] text-sm mb-2 block">Password</span>
                        <input
                            type='password'
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className='text-[#F9FAFB]' htmlFor="roles">Select role : </label>
                        <select onChange={(e) => setRole(e.target.value)} value={role} defaultValue='' name={role} className='text-[#F9FAFB] border-2 rounded' id="roles">
                            <option >
                                -- Choose Role --
                            </option>
                            <option className='text-black' value="admin">Admin</option>
                            <option className='text-black' value="security">Secuirty</option>
                            <option className='text-black' value="employee">Employee</option>
                            <option className='text-black' value="visitor">Visitor</option>
                        </select>

                        {error && <p className="mt-2 mb-2 text-red-600">{error}</p>}

                        <button className="bg-[#F59E0B] mx-auto mt-4 text-center block text-white px-4  py-1 rounded-[50px] cursor-pointer" type="submit">Sign up</button>
                        <p className="my-5 text-center text-[#F9FAFB]">Already have account ? <NavLink to={'/login'} className="hover:text-[#D97706] text-[#F59E0B]">Login</NavLink></p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register