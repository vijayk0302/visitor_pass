import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from "../api/api";


const ChangePassword = () => {
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newpassword !== confirmpassword) {
            return toast.error("New passwords do not match");
        }
        try {
            const res = await api.post("/api/auth/change-password",
                {
                    oldPassword: oldpassword,
                    newPassword: newpassword
                },
            );
            toast.success(res.data.msg);
            setOldpassword(""); setNewpassword(""); setConfirmpassword("");

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };
   

    return (
        <div className="mt-16">
            <div className="w-full max-w-md mx-auto bg-[#111827] text-white shadow-2xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center">
                    Change Password
                </h2>
               
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                    <div className="relative">
                        <label className="text-sm text-gray-400">Old Password</label>
                        <input
                            type= 'password'
                            name="oldpassword"
                            value={oldpassword}
                            onChange={(e) => setOldpassword(e.target.value)}
                            placeholder="Enter old password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                        
                    </div>


                    <div className="relative">
                        <label className="text-sm text-gray-400">New Password</label>
                        <input
                            type='password' 
                            name="newpassword"
                            value={newpassword}
                            onChange={(e) => setNewpassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                            minLength={6}
                            maxLength={12}
                        />
                        
                    </div>


                    <div className="relative">
                        <label className="text-sm text-gray-400">Confirm Password</label>
                        <input
                            type='password' 
                            name="confirmpassword"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                            minLength={6}
                            maxLength={12}
                        />
                        
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-400 active:scale-95 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;