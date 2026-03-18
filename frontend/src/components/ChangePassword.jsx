import React from 'react'

import { useState } from 'react';
import { changePassword } from '../service/Authservice';


const ChangePassword = () => {


    const [form, setForm] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");


        if (form.newpassword !== form.confirmpassword) {
            return setError("New passwords do not match");
        }

        try {
            const res = await changePassword(

                {
                    oldpassword: form.oldpassword,
                    newpassword: form.newpassword
                }, {
                withCredentials: true
            }
            );
            setMessage(res.data.message);
            setForm({
                oldpassword: "",
                newpassword: "",
                confirmpassword: ""
            });
            alert('password changed')
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };
    return (
        <>
            <div className="max-w-80 mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="font-bold text-lg">Change Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-6 " >
                        <input className="rounded-lg block border-2 border-[#F59E0B] py-2  outline-blue-400"
                            type="password"
                            name="oldpassword"
                            placeholder="Old Password"
                            value={form.oldpassword}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="rounded-lg block border-2 border-[#F59E0B] py-2 outline-blue-400"
                            type="password"
                            name="newpassword"
                            placeholder="New Password"
                            value={form.newpassword}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="rounded-lg block border-2 border-[#F59E0B] py-2 outline-blue-400"
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm New Password"
                            value={form.confirmpassword}
                            onChange={handleChange}
                            required
                        />
                        {message && <p className="success">{message}</p>}
                        {error && <p className="error">{error}</p>}

                        <div className="flex justify-center">
                            <button className="bg-[#1e88e5] p-2.5 rounded-lg" type="submit">Change Password</button>

                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword