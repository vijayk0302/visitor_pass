import React from 'react'
import Logoutbtn from '../components/Logoutbtn'
import { useState, useEffect } from 'react'
import api from '../api/api'
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdDoNotDisturbAlt } from "react-icons/md";



const Appointment = () => {
  const navigate = useNavigate()
  
  const [appointments, setAppointments] = useState([])


  useEffect(() => {
    fetctalluser()
  }, [])

  const fetctalluser = async () => {
    const res = await api.get('/api/appointments')
    setAppointments(res.data.appointments)
    console.log(res.data.appointments)
  }
  const approveappointment = async (id) => {
    await api.patch(`/api/appointments/update/${id}`)
    fetctalluser()
    alert('appointmet approved and pass created')

  }

  return (
    <div className='w-full'>
      <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
        <h1 className='md:ml-0 ml-9 font-bold text-sm sm:text-xl'>Appointments</h1>
        <Logoutbtn />
      </div>
      <div className='overflow-x-auto rounded-lg shadow-lg mt-6 '>
        <table className='min-w-full  rounded-xl border border-gray-100'>
          <thead className="bg-gray-300">
            <tr >
              <th className="px-2 py-3 border-b  text-left ">Name</th>
              <th className="px-2 py-3 border-b  text-left ">Email</th>
              <th className="px-2 py-3 border-b text-left ">photo</th>
              <th className="px-2 py-3 border-b  text-left ">phone</th>
              <th className="px-2 py-3 border-b  whitespace-nowrap text-left ">Id proof</th>
              <th className="px-2 py-3 border-b whitespace-nowrap text-left ">Purpose</th>
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
                  <td className="px-2 whitespace-nowrap py-3 "> {v.idproof} </td>
                  <td className="px-2 whitespace-nowrap py-3 "> {v.purpose} </td>
                  <td className="px-2 py-3 "> {v.status} </td>
                  <td className="px-2 py-3 ">
                    <div className='flex space-x-4 items-center'>
                    
                      <FaUserEdit
                        onClick={() => v.status === 'pending' && approveappointment(v._id)}
                        className={`text-xl cursor-pointer ${v.status === 'pending'
                            ? 'text-green-600 hover:scale-110'
                            : 'text-gray-400 cursor-not-allowed'
                          }`}
                        title="Approve"
                      />

                      <MdDoNotDisturbAlt
                        onClick={() => navigate(`/appointments/${v._id}`)}
                        className="text-red-500 text-xl cursor-pointer hover:scale-110"
                        title="View / Reject"
                      />
                    </div>
                  </td>
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