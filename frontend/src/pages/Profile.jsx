import React, { useEffect, useState } from "react";
import api from "../api/api";
import Logoutbtn from "../components/Logoutbtn";
import { useNavigate } from "react-router-dom";



const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get(`/api/users/me`);
    setUser(res.data.user);
   
  };
  if (!user.name) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="w-full">

      <div className="bg-gray-200 flex justify-between items-center shadow-lg p-4">
        <h1 className="font-bold text-sm sm:text-xl">My Profile</h1>
        <Logoutbtn />
      </div>

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
    </div>
  );
};

export default Profile;