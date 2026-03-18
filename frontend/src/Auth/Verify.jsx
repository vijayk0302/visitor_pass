import React from 'react'
import api from "../api/api.js";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgyellow from '../assets/bg-yellow.jpg'
import email from '../assets/Mar-Business_18.jpg'

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
        <div style={{ backgroundImage: `url(${bgyellow})` }} className='min-h-screen  bg-cover bg-center flex justify-center items-center p-3'>
            <div className='bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-lg shadow-xl max-w-md w-full text-center'>
                <div className='flex justify-center'>
                <img className='h-50' src={email} alt="" />
                </div>
                <h1 className='text-xl mt-3'>Verify your email address</h1>
                <p className='text-sm text-gray-500 mt-3'>The verification code has been sent to your email address.Please check</p> 
                <form onSubmit={handlesubmit} className='mt-4' >
                    <input value={code} onChange={(e) => setCode(e.target.value)} className='px-3 py-2 w-full bg-gray-200 rounded-lg border outline-blue-400' type="text" maxLength="6" required placeholder='Verification code ...' />
                    <div className='flex justify-center items-center'>
                        <button disabled={loading} className='block text-white bg-[#f59f0bd8] px-3 py-2 rounded-[50px] cursor-pointer mt-5 disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'>{loading ? "Verifying..." : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Verify