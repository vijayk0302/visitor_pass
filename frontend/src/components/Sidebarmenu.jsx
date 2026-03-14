import { NavLink } from "react-router-dom";
import { FaLaptop, FaRegIdBadge, FaCalendarAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser, FaPerson } from "react-icons/fa6";
import { IoIosAnalytics } from "react-icons/io";


const Sidebarmenu = ({setIsopen}) => {
  
  return (
    <>
    <h2 className=" sm:text-2xl text-sm sm:text-center font-bold my-2">visi.co</h2>

          <nav className="flex flex-col space-y-4 gap-2 mt-7.5">
            <div className="flex items-center space-x-3">
              <FaLaptop className="text-xl shrink-0"  />
              <span >
                <NavLink onClick={()=>setIsopen(false)} className={({ isActive }) => isActive ? "text-[#F59E0B]" : ""} to="/dashboard"> Dashboard</NavLink>
              </span>
            </div>

            <div className="flex items-center space-x-3 ">
              <MdAdminPanelSettings className="text-xl shrink-0"  />
              <span >
                <NavLink onClick={()=>setIsopen(false)} className={({ isActive }) => isActive ? "text-[#F59E0B]" : ""} to="/admin">Admin</NavLink>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <ImProfile className="text-xl shrink-0"  />
              <span >
                <NavLink onClick={()=>setIsopen(false)} className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/profile">Profile</NavLink>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaUser className="text-xl shrink-0"  />
              <span >
                <NavLink onClick={()=>setIsopen(false)} className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/employees">Employees</NavLink>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaPerson className="text-xl shrink-0"  />
              <span >
                <NavLink onClick={()=>setIsopen(false)} className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/visitors">Visitors</NavLink>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-xl shrink-0"  />
              <span >
                <NavLink onClick={()=>setIsopen(false)} className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/appointment">All Appointment</NavLink>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <FaRegIdBadge className="text-xl shrink-0"  />
              <span >
                <NavLink onClick={()=>setIsopen(false)} className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/passes">Passes</NavLink>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <IoIosAnalytics className="text-xl shrink-0"  />
              <span >
                <NavLink onClick={()=>setIsopen(false)} className={({ isActive }) => isActive ? "text-[#f59e0b]" : ""} to="/log">Visitor's Logs</NavLink>
              </span>
            </div>
          </nav>

    </>
  )
}

export default Sidebarmenu