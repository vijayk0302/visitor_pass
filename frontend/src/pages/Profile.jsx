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
        <h1 className="md:ml-0 ml-9 font-bold text-sm sm:text-xl">My Profile</h1>
        <Logoutbtn />
      </div>
      <Profilecard user={user}/>
      <ChangePassword/>

      
      
    </div>
  );
};

export default Profile;