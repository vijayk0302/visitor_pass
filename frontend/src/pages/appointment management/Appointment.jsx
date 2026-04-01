import React, { useState, useEffect } from 'react'
import Logoutbtn from '../../components/Logoutbtn'
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdDoNotDisturbAlt } from "react-icons/md";
import { toast } from 'react-toastify';
import { FiSearch } from "react-icons/fi";
import api from '../../api/api';

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

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
      toast.success('Appointment Approved')
    } catch (err) {
      toast.error(err);
    }
  };

  const statusColor = (status) => {
    if (status === "approved") return "text-green-400 bg-green-500/10 border-green-500/20";
    if (status === "pending") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-gray-400 bg-gray-500/10 border-gray-500/20";
  };

  const filterappointment = appointments.filter((u) => {
    const query = search.toLowerCase();
    return (u.visitor?.name?.toLowerCase().includes(query) ||
      u.visitor?.email?.toLowerCase().includes(query) ||
      u.phone?.toLowerCase().includes(query) ||
      u.status?.toLowerCase().includes(query))
  })

  const [currentpage, setCurrentpage] = useState(1);
    const listperpage = 5
  
    const totalPages = Math.ceil(filterappointment.length / listperpage);
    const lastindex = currentpage * listperpage;
    const firstindex = lastindex - listperpage;
    const currentlists = filterappointment.slice(firstindex, lastindex)


  return (
    <div className='min-h-screen w-full bg-[#111827] text-white'>

      <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
        <h1 className='md:ml-0 ml-9 text-xl font-bold'>Appointments</h1>
        <Logoutbtn />
      </div>

      <div className="relative w-full max-w-sm p-3 ">
        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by name,email,phone'
          className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#F59E0B] outline-none"
        />
      </div>

      <div className='p-3'>
        <div className='bg-[#1F2937] rounded-2xl shadow-xl border border-white/10 overflow-x-auto'>
          <table className='min-w-full'>
            <thead className="bg-white/5 text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">ID Proof</th>
                <th className="px-6 py-4 text-left">Purpose</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>


            <tbody>
              {filterappointment.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No appointments found
                  </td>
                </tr>
              ) : (
                currentlists.map((v) => (
                  <tr
                    key={v._id}
                    className="border-t border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={v.photo}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{v.visitor?.name}</p>
                        <p className="text-gray-400 text-sm">
                          {v.visitor?.email}
                        </p>
                      </div>
                    </td>


                    <td className="px-6 py-4 text-gray-400">{v.phone}</td>


                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{v.idproof}</td>


                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{v.purpose}</td>


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
                          className={`p-2 rounded-lg transition ${v.status === 'pending'
                              ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                              : 'bg-gray-500/10 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                          <FaUserEdit />
                        </button>

                        <button
                          disabled={v.status === 'approved' || v.status === 'rejected'}
                          onClick={() => navigate(`/appointments/${v._id}`)}
                          className={`p-2 rounded-lg ${(v.status === 'approved' || v.status === 'rejected') ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 transition'
                            } `}
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
      <div className="flex flex-col absolute left-25 sm:left-[50%] bottom-0 justify-center items-center gap-2 py-6">

        <p className="text-center text-gray-400">
          Page {currentpage} of {totalPages}
        </p>
        <div className='flex justify-center items-center gap-2'>

          <button
            onClick={() => setCurrentpage((prev) => prev - 1)}
            disabled={currentpage === 1}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {
          Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentpage(num)}
              className={`px-3 py-1 rounded ${currentpage === num
                ? "bg-[#F59E0B] text-black"
                : "bg-gray-700"
                }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentpage((prev) => prev + 1)}
            disabled={currentpage === totalPages}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;