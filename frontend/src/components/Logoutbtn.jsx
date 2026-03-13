import React from 'react'
import api from "../api/api.js";

const Logoutbtn = () => {
    const handleLogout = async () => {
    try {
      await api.patch("/api/auth/logout");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
    return (
        <div>

            <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm sm:text-lg bg-red-500 text-white rounded cursor-pointer"
            >
                Logout
            </button>
        </div>
    )
}

export default Logoutbtn