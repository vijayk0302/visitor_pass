import React, { useState, useEffect } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdDoNotDisturbAlt } from "react-icons/md";

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetctalluser();
  }, []);

  const fetctalluser = async () => {
    const res = await api.get('/api/appointments');
    setAppointments(res.data.appointments);
  };

  const approveappointment = async (id) => {
    try {
      await api.patch(`/api/appointments/update/${id}`);
      fetctalluser();
    } catch (err) {
      console.log(err);
    }
  };

  const statusColor = (status) => {
    if (status === "approved") return "text-green-400 bg-green-500/10 border-green-500/20";
    if (status === "pending") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-gray-400 bg-gray-500/10 border-gray-500/20";
  };

  return (
    <div className='min-h-screen w-full bg-[#111827] text-white'>

  
      <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
        <h1 className='md:ml-0 ml-9 text-xl font-bold'>Appointments</h1>
        <Logoutbtn />
      </div>

     
      <div className='p-6'>
        <div className='bg-[#1F2937] rounded-2xl shadow-xl border border-white/10 overflow-x-auto'>

          <table className='min-w-full'>

           
            <thead className="bg-white/5 text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 text-center">User</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">ID Proof</th>
                <th className="px-6 py-4 text-left">Purpose</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

          
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((v) => (
                  <tr
                    key={v._id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >

                 
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={v.photo}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{v.visitor.name}</p>
                        <p className="text-gray-400 text-sm">
                          {v.visitor.email}
                        </p>
                      </div>
                    </td>

                    
                    <td className="px-6 py-4 text-gray-400">{v.phone}</td>

                 
                    <td className="px-6 py-4 text-gray-400">{v.idproof}</td>

                
                    <td className="px-6 py-4 text-gray-400">{v.purpose}</td>

                
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs rounded-full border ${statusColor(v.status)}`}>
                        {v.status}
                      </span>
                    </td>

                  
                    <td className="px-6 py-4">
                      <div className="flex gap-3">

                        <button
                          disabled={v.status !== 'pending'}
                          onClick={() => approveappointment(v._id)}
                          className={`p-2 rounded-lg transition ${
                            v.status === 'pending'
                              ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                              : 'bg-gray-500/10 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <FaUserEdit />
                        </button>

                        <button
                          onClick={() => navigate(`/appointments/${v._id}`)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        >
                          <MdDoNotDisturbAlt />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointment;