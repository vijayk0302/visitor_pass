import React from 'react'
import { useNavigate } from "react-router-dom";

const Profilecard = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className='max-w-md mx-auto'>
            <div className="mt-10  bg-[#111827] text-white shadow-2xl rounded-2xl p-6 transition-transform hover:scale-105 duration-300">
                <div className="flex  flex-col items-center space-y-3">
                    <div className="w-24 h-24 rounded-full bg-[#F59E0B] text-[#111827] flex items-center justify-center text-3xl font-bold shadow-md ring-4 ring-[#F59E0B]/40">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <h2 className="text-2xl font-bold tracking-wide">{user.name}</h2>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                </div>


                <div className="mt-6 bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Role</span>
                        <span className="font-semibold capitalize text-[#F59E0B]">
                            {user.role}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className="font-semibold capitalize text-[#F59E0B]">
                            {user.status}
                        </span>
                    </div>
                </div>


                {user.role === 'visitor' && (
                    <div className="flex gap-3 mt-6">

                        <button
                            onClick={() => navigate('/appointmentform')}
                            className="flex-1 bg-[#F59E0B] text-[#111827] font-semibold py-2 rounded-lg shadow-md hover:bg-yellow-400 active:scale-95 transition"
                        >
                            Book
                        </button>

                        <button
                            onClick={() => navigate(`/my-pass/${user._id}`)}
                            className="flex-1 border border-[#F59E0B] text-[#F59E0B] font-semibold py-2 rounded-lg hover:bg-[#F59E0B] hover:text-[#111827] active:scale-95 transition"
                        >
                            Passes
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Profilecard;