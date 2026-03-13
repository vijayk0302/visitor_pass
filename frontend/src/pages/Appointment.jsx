import React from 'react'
import Logoutbtn from '../components/Logoutbtn'
import { useState, useEffect } from 'react'
import api from '../api/api'
import { FaUserEdit } from "react-icons/fa";


const Appointment = () => {
  const statuscolor={
    approved:'text-green-600 text-xl cursor-pointer',
    pending:'text-yellow-600 text-xl cursor-pointer',
    rejected:'text-red-600 text-xl cursor-pointer'
  }
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetctalluser()
  }, [])

  const fetctalluser = async () => {
    const res = await api.get('/api/appointments')
    setAppointments(res.data.appointments)
  }
  const approveappointment=async(id)=>{
    await api.patch(`/api/appointments/update/${id}`)
    fetctalluser()

  }

  return (
    <div className='w-[85%] sm:w-4/5'>
      <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
        <h1 className='font-bold text-sm sm:text-xl'>Appointments</h1>
        <Logoutbtn />
      </div>
      <div className='overflow-x-auto rounded-lg shadow-lg mt-6 p-2'>
        <table className='min-w-full rounded-xl border border-gray-100'>
          <thead className="bg-gray-300">
            <tr >
              <th className="px-2 py-3 border-b  text-left ">Name</th>
              <th className="px-2 py-3 border-b  text-left ">Email</th>
              <th className="px-2 py-3 border-b text-left ">photo</th>
              <th className="px-2 py-3 border-b  text-left ">phone</th>
              <th className="px-2 py-3 border-b  text-left ">Id proof</th>
              <th className="px-2 py-3 border-b  text-left ">Purpose</th>
              <th className="px-2 py-3 border-b text-left ">Status</th>
              <th className="px-2 py-3 border-b text-left ">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (<tr>
              <td colSpan={8} className="text-center py-2">
                No Appointment Found
              </td>
            </tr>) : (
              appointments.map((v) => (
                <tr key={v._id} className="hover:bg-gray-50">
                  <td className="px-2 py-3 "> {v.visitor.name} </td>
                  <td className="px-2 py-3 "> {v.visitor.email} </td>
                  <td className="px-2 py-3 "> <img className='w-10 h-10 rounded-full' src={v.photo} alt="" />{v.role} </td>
                  <td className="px-2 py-3 "> {v.phone} </td>
                  <td className="px-2 py-3 "> {v.idproof} </td>
                  <td className="px-2 py-3 "> {v.purpose} </td>
                  <td className="px-2 py-3 "> {v.status} </td>
                  <td className="px-2 py-3 "> <div className='flex space-x-4'>
                    <FaUserEdit  onClick={()=>approveappointment(v._id)} className={statuscolor[v.status]||'text-black '} />
                    
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

export default Appointment