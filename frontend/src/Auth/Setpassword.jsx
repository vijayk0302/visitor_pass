import api from "../api/api.js";
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";


const Setpassword = () => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();
    const [show, setShow] = useState(true)
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState("");
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(`/api/auth/set-password`, {
                token,
                password
            })
            navigate('/login');
            toast.success('Password set successfully')

        } catch (err) {
            if (err.response?.data?.errors) {
                const backendErrors = err.response.data.errors;

                const formattedErrors = {};

                backendErrors.forEach((e) => {
                    formattedErrors[e.path] = e.msg;
                });
                setErrors(formattedErrors);
                setGeneralError("");

            } else {
                setGeneralError(err.response?.data?.message || "Something went wrong");
                setErrors({});
            }
        } finally {
            setLoading(false);

        }
    }
    const Togglepassword = () => {
        setShow(!show)

    }

    return (
        <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-[#1F2937] text-white p-8 rounded-2xl shadow-2xl border border-white/10">


                <h1 className="text-2xl font-bold mt-4 text-center">
                    Set Password
                </h1>

                <p className="text-gray-400 text-sm mt-2 text-center">
                    Set your passwrd securely
                </p>

                <form className="mt-6 space-y-5">
                    <div className="relative">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={show ? 'password' : 'text'}
                            required
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 bg-[#111827] border border-white/10 rounded-lg text-center tracking-widest text-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                        />

                        <div className="absolute text-xl right-4 bottom-3 text-gray-400">
                            {
                                show ? <BsEyeFill onClick={Togglepassword} /> : <BsEyeSlashFill onClick={Togglepassword} />
                            }

                        </div>

                    </div>
                    <div className="border inset-shadow-xs inset-shadow-[#F59E0B] p-2 bg-[#111827] rounded-lg text-gray-400 text-sm border-white/10">
                    <ul className="list-disc p-3">
                        <li>password must contain atleat 6 chracter </li>
                        <li>password must contain atleat one Uppercase letter</li>
                        <li>password must contain atleat one Numerical value</li>
                        <li>password must contain atleat one Special character</li>
                    </ul>
                    </div>
                    {errors.password && (
                        <p className="text-red-400 rounded p-2 bg-red-500/10 border-red-500/20 text-sm">{errors.password}</p>
                    )}
                     {generalError && (
                        <p className="text-red-400 rounded p-2 bg-red-500/10 border-red-500/20 text-sm">{generalError}</p>
                    )}


                    <button
                        onClick={handlesubmit}
                        disabled={loading}
                        className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold hover:bg-yellow-400 active:scale-95 transition disabled:opacity-60"
                    >
                        {loading ? "submitting..." : "Submit"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Setpassword