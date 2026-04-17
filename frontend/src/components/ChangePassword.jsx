import React, { useState } from 'react';

import { toast } from 'react-toastify';
import api from "../api/api";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const ChangePassword = () => {

    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const [show, setShow] = useState(true)
    const [errors, setErrors] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');

        if (newpassword !== confirmpassword) {
            return toast.error("New passwords do not match");
        }

        try {
            const res = await api.post("/api/auth/change-password",
                {
                    oldpassword: oldpassword,
                    newpassword: newpassword
                },
            );

            toast.success(res.data?.message);

            setOldpassword(""); setNewpassword(""); setConfirmpassword("");

        } catch (err) {
            console.log(err.response);

            if (err.response && err.response.data) {
                const data = err.response.data;

                if (data.errors && data.errors.length > 0) {
                    setErrors(data.errors[0].msg);
                } else {
                    toast.error(data.message || " failed to change password");
                }
            } else {
                setErrors("Something went wrong");
            }
        }
    };
    const Togglepassword = () => {
        setShow(!show)
    }

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

                    <div className="relative">
                        <label className="text-sm text-gray-400">Old Password</label>
                        <input
                            type={show ? 'password' : 'text'}
                            name="oldpassword"
                            value={oldpassword}
                            onChange={(e) => setOldpassword(e.target.value)}
                            placeholder="Enter old password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                        <div onClick={Togglepassword} className="absolute text-xl right-4 bottom-3 text-gray-400">
                            {
                                show ? <BsEyeFill /> : <BsEyeSlashFill />
                            }

                        </div>
                    </div>


                    <div className="relative">
                        <label className="text-sm text-gray-400">New Password</label>
                        <input
                            type={show ? 'password' : 'text'}
                            name="newpassword"
                            value={newpassword}
                            onChange={(e) => setNewpassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                        <div onClick={Togglepassword} className="absolute text-xl right-4 bottom-3 text-gray-400">
                            {
                                show ? <BsEyeFill /> : <BsEyeSlashFill />
                            }

                        </div>
                    </div>


                    <div className="relative">
                        <label className="text-sm text-gray-400">Confirm Password</label>
                        <input
                            type={show ? 'password' : 'text'}
                            name="confirmpassword"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                        <div onClick={Togglepassword} className="absolute text-xl right-4 bottom-3 text-gray-400">
                            {
                                show ? <BsEyeFill /> : <BsEyeSlashFill />
                            }

                        </div>
                    </div>
                    {errors && (
                        <p className="text-red-400 rounded p-2 bg-red-500/10 border-red-500/20 text-sm">{errors}</p>
                    )}

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