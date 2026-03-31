import React, { useState } from 'react';

import { toast } from 'react-toastify';
import api from "../api/api";

const ChangePassword = () => {

    const [form, setForm] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newpassword !== form.confirmpassword) {
            return toast.error("New passwords do not match");
        }

        try {
            const res = await api.post("/api/auth/change-password",
                {
                    oldpassword: form.oldpassword,
                    newpassword: form.newpassword
                },
                { withCredentials: true }
            );

            toast.success(res.data.message);
            setForm({
                oldpassword: "",
                newpassword: "",
                confirmpassword: ""
            });

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="mt-16">
            <div className="w-full max-w-md mx-auto bg-[#111827] text-white shadow-2xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center">
                    Change Password
                </h2>
                <p className="text-center text-gray-400 text-sm mt-1">
                    Update your credentials securely
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                          
                    <div>
                        <label className="text-sm text-gray-400">Old Password</label>
                        <input
                            type="password"
                            name="oldpassword"
                            value={form.oldpassword}
                            onChange={handleChange}
                            placeholder="Enter old password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                    </div>

                   
                    <div>
                        <label className="text-sm text-gray-400">New Password</label>
                        <input
                            type="password"
                            name="newpassword"
                            value={form.newpassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                    </div>

                    
                    <div>
                        <label className="text-sm text-gray-400">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmpassword"
                            value={form.confirmpassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
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