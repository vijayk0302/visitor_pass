import React from 'react'
import { useNavigate } from "react-router-dom";

const Profilecard = ({ user }) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-80 mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 ">
            <div className="flex flex-col items-center space-y-4">

                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>

            <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-500">Role</span>
                    <span className="font-medium">{user.role}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium">{user.status}</span>
                </div>
            </div>

            <div className="flex space-x-5 mt-3">

                {user.role === 'visitor' ? <button onClick={() => { navigate('/appointmentform') }} className="text-center w-fit bg-blue-700 px-4 py-2 rounded-lg text-white text-lg">Book appointment</button> : null}
                {user.role === 'visitor' ? <button onClick={() => { navigate(`/my-pass/${user._id}`) }} className="text-center w-fit  bg-blue-700 px-4 py-2 rounded-lg text-white text-lg">View passes</button> : null}
            </div>
        </div>
    )
}

export default Profilecard