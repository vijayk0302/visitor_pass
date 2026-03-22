import React, { useState } from 'react'
import api from "../api/api.js";
import { useNavigate } from 'react-router-dom';
import email from '../assets/Mar-Business_18.jpg'
import { toast } from 'react-toastify';

const Verify = () => {
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post(`/api/auth/verify`, { code });
            navigate('/login');
            toast.success('verfication successful')
        } catch (error) {
            toast.error(error?.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-[#1F2937] text-white p-8 rounded-2xl shadow-2xl border border-white/10">

               
                <div className="flex justify-center">
                    <img className="h-40 object-contain" src={email} alt="verify" />
                </div>

                
                <h1 className="text-2xl font-bold mt-4 text-center">
                    Verify Email
                </h1>

                <p className="text-gray-400 text-sm mt-2 text-center">
                    Enter the 6-digit code sent to your email
                </p>

               
                <form onSubmit={handlesubmit} className="mt-6 space-y-5">

                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength="6"
                        required
                        placeholder="Enter verification code"
                        className="w-full px-4 py-2 bg-[#111827] border border-white/10 rounded-lg text-center tracking-widest text-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                    />

                  
                    {error && (
                        <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                            {error}
                        </p>
                    )}

            
                    <button
                        disabled={loading}
                        className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold hover:bg-yellow-400 active:scale-95 transition disabled:opacity-60"
                    >
                        {loading ? "Verifying..." : "Verify Code"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Verify;