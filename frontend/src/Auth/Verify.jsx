import React from 'react'
import api from "../api/api.js";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await api.post(`/api/auth/verify`, { code });
            alert('your email has been verified')
            navigate('/login')

        } catch (error) {
            alert(error?.response?.data?.message || "Verification failed")
        }finally{
            setLoading(false)
        }

    }

    return (
        <div className='min-h-screen flex justify-center items-center p-3'>
            <div className='text-center border rounded-lg shadow-lg p-7'>
                <h1 className='text-4xl'>Verify your email address</h1>
                <p className='text-xl text-gray-500 mt-3'>The verification has been sent to your email address</p>
                <form onSubmit={handlesubmit} className='mt-4' >
                    <input value={code} onChange={(e) => setCode(e.target.value)} className='px-3 py-2 w-1/2 bg-gray-200 rounded-lg border outline-blue-400' type="text" maxLength="6" required placeholder='Verification code ...' />
                    <div className='flex justify-center items-center'>
                        <button disabled={loading} className='block text-white bg-[#f59f0bd8] px-3 py-2 rounded-[50px] cursor-pointer mt-5 disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'>{loading ? "Verifying..." : "Submit"}</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Verify