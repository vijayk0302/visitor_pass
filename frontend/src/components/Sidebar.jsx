import { NavLink } from "react-router-dom";
import { FaLaptop, FaRegIdBadge, FaCalendarAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser, FaPerson } from "react-icons/fa6";
import { IoIosAnalytics } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {
  const navigate = useNavigate()


  return (
    <>
      <aside className="w-[15%] sm:w-1/5 bg-slate-800 min-h-screen text-white p-4">

        <h2 className=" sm:text-2xl text-sm sm:text-center font-bold my-2">visi.co</h2>

        <nav className="flex flex-col space-y-4 gap-2 mt-7.5">
          <div className="flex items-center space-x-3">
            <FaLaptop className="text-xl shrink-0" onClick={()=>navigate('/dashboard')} />
            <span className="hidden lg:block sm:block">
              <NavLink className={({ isActive }) => isActive ? "text-[#F59E0B]" : ""} to="/dashboard"> Dashboard</NavLink>
            </span>
          </div>

          <div className="flex items-center space-x-3 ">
            <MdAdminPanelSettings className="text-xl shrink-0" onClick={()=>navigate('/admin')}  />
            <span className="hidden lg:block sm:block">
              <NavLink className={({ isActive }) => isActive ? "text-[#F59E0B]" : ""} to="/admin">Admin</NavLink>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <ImProfile className="text-xl shrink-0" onClick={()=>navigate('/profile')} />
            <span className="hidden lg:block sm:block">
              <NavLink className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/profile">Profile</NavLink>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <FaUser className="text-xl shrink-0"  onClick={()=>navigate('/employees')}  />
            <span className="hidden lg:block sm:block">
              <NavLink className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/employees">Employees</NavLink>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <FaPerson className="text-xl shrink-0" onClick={()=>navigate('/visitors')}  />
            <span className="hidden lg:block sm:block">
              <NavLink className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/visitors">Visitors</NavLink>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-xl shrink-0" onClick={()=>navigate('/appointment')} />
            <span className="hidden lg:block sm:block">
              <NavLink className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/appointment">All Appointment</NavLink>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <FaRegIdBadge className="text-xl shrink-0" onClick={()=>navigate('/passes')}/>
            <span className="hidden lg:block sm:block">
              <NavLink className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/passes">Passes</NavLink>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <IoIosAnalytics className="text-xl shrink-0" onClick={()=>navigate('/log')}/>
            <span className="hidden lg:block sm:block">
              <NavLink className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/log">Visitor's Logs</NavLink>
            </span>
          </div>
        </nav>
      </aside>
    </>
  );
}