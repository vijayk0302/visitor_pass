import React, { useState, useEffect } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'



const Employee = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([])

  useEffect(() => {
    fetctalluser()
  }, [])

  const fetctalluser = async () => {
    const res = await api.get('/api/users')
    setUser(res.data.user)

  }
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/api/users/${id}`);
        fetctalluser()
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };


  return (
    <div className='w-[85%] sm:w-4/5'>
      <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
        <h1 className='font-bold text-sm sm:text-xl'>Employees</h1>
        <Logoutbtn/>
       
      </div>
      <div className='overflow-x-auto rounded-lg shadow-lg mt-6 p-2'>
        <table className='min-w-full rounded-xl border border-gray-100'>
          <thead className="bg-gray-300">
            <tr >
              <th className="px-2 py-3 border-b  text-left ">Name</th>
              <th className="px-2 py-3 border-b text-left ">Email</th>
              <th className="px-2 py-3 border-b  text-left ">Role</th>
              <th className="px-2 py-3 border-b text-left ">Status</th>
              <th className="px-2 py-3 border-b text-left ">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.length === 0 ? (<tr>
              <td colSpan={5} className='text-center py-2'>
                No Employee Found
              </td>
            </tr>) : (
              user.map((v) => (
                <tr key={v._id} className="hover:bg-gray-50">
                  <td className="px-2 py-3 "> {v.name} </td>
                  <td className="px-2 py-3 "> {v.email} </td>
                  <td className="px-2 py-3 "> {v.role} </td>
                  <td className="px-2 py-3 "> {v.status} </td>
                  <td className="px-2 py-3 "> <div className='flex space-x-4'>
                    <MdDelete onClick={()=> { deleteUser(v._id) }} className='text-red-600 text-lg cursor-pointer' />
                    <FaUserEdit onClick={() => { navigate(`/employees/edit/${v._id}`) }} className='text-green-600 text-lg cursor-pointer' />
                  </div> </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Employee