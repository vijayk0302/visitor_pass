import { NavLink } from "react-router-dom";
import { FaLaptop, FaRegIdBadge, FaCalendarAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser, FaPerson } from "react-icons/fa6";
import { IoIosAnalytics } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import api from "../api/api.js";
import { useEffect, useState } from "react";
import visi from "../assets/visi.png";

const Sidebarmenu = ({ setIsopen }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    fetchRole();
  }, []);
  
  const fetchRole = async () => {
    try {
      const res = await api.get("/api/users/me");
      setRole(res.data.user.role);
    } catch (err) {
      console.error("Failed to fetch role", err);
    }
  };


  const handlelogbtn = async () => {
    try {
      await api.patch("/api/auth/logout");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  return (
    <>
      <div className="flex justify-center">
        <img className="size-15 rounded-4xl" src={visi} alt="logo" />
      </div>

      <nav className="flex flex-col mt-6 space-y-5">
        {role !== 'visitor' && (<NavLink className={({ isActive }) => `flex gap-4 ${isActive ? "text-[#f59e0b]" : "text-white"}`} to={'/dashboard'} onClick={() => setIsopen(false)}><FaLaptop className="mt-1 text-lg" /> Dashboard</NavLink>)}

        {role === 'admin' && (<NavLink className={({ isActive }) => `flex gap-4 ${isActive ? "text-[#f59e0b]" : "text-white"}`} to={'/admin'} onClick={() => setIsopen(false)}><MdAdminPanelSettings className="mt-1 text-lg" />Admin</NavLink>)}

        <NavLink className={({ isActive }) => `flex gap-4 ${isActive ? "text-[#f59e0b]" : "text-white"}`} to="/profile" onClick={() => setIsopen(false)}><ImProfile className="mt-1 text-lg" /> Profile</NavLink>

        {role === "admin" && (<NavLink className={({ isActive }) => `flex gap-4 ${isActive ? "text-[#f59e0b]" : "text-white"}`} to="/employees" onClick={() => setIsopen(false)}><FaUser className="mt-1 text-lg" /> Employees</NavLink>)}

        {(role === "admin" || role === "employee") && (<NavLink className={({ isActive }) => `flex gap-4 ${isActive ? "text-[#f59e0b]" : "text-white"}`} to="/visitors" onClick={() => setIsopen(false)}><FaPerson className="mt-1 text-lg" /> Visitors</NavLink>)}

        {(role === "admin" || role === "employee") && (<NavLink className={({ isActive }) => `flex gap-4 ${isActive ? "text-[#f59e0b]" : "text-white"}`} to="/appointment" onClick={() => setIsopen(false)}><FaCalendarAlt className="mt-1 text-lg" /> Appointments</NavLink>)}

        {role !== "visitor" && (<NavLink className={({ isActive }) => `flex gap-4 ${isActive ? "text-[#f59e0b]" : "text-white"}`} to="/passes" onClick={() => setIsopen(false)}><FaRegIdBadge className="mt-1 text-lg" /> Passes</NavLink>)}

        {(role === "admin" || role === "security") && (<NavLink className={({ isActive }) => `flex gap-4 ${isActive ? "text-[#f59e0b]" : "text-white"}`} to="/log" onClick={() => setIsopen(false)}><IoIosAnalytics className="mt-1 text-lg" /> Logs</NavLink>)}

        <div onClick={handlelogbtn} className="cursor-pointer  flex gap-4">
          <CiLogout className="mt-1 text-lg" /> Logout
        </div>
      </nav>
    </>
  );
};

export default Sidebarmenu;