import api from "../api/api.js";
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const Setpassword = () => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();
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
            toast.error(err );
        } finally {
            setLoading(false);

        }
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

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        required
                        placeholder="Enter Password"
                        className="w-full px-4 py-2 bg-[#111827] border border-white/10 rounded-lg text-center tracking-widest text-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                    />

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