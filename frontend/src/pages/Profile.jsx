import React, { useEffect, useState } from "react";
import api from "../api/api";
import Logoutbtn from "../components/Logoutbtn";

import Profilecard from "../components/Profilecard";
import ChangePassword from "../components/ChangePassword";

const Profile = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/api/users/me`);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111827] text-white flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#111827] text-white">

      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-xl md:ml-0 ml-9 font-bold">My Profile</h1>
        <Logoutbtn />
      </div>

      <Profilecard user={user} />

      <ChangePassword />

    </div>


  );
};

export default Profile;