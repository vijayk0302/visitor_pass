import React, { useEffect, useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import { MdPendingActions } from "react-icons/md";



const Visitors = () => {

  const statuscolor = {
    active: 'text-green-600 text-xl cursor-pointer',
    pending: 'text-yellow-600 text-xl cursor-pointer'
  }
  const [visitors, setVisitors] = useState([])
  useEffect(() => {
    fetchvisitordata()
  }, [])

  const fetchvisitordata = async () => {
    const res = await api.get(`/api/users/visitor`)
    setVisitors(res.data.visitor)
  }
  const updateVisitorStatus = async (id) => {
    await api.put(`/api/users/visitor/status/${id}`)
    fetchvisitordata()

  }

  const statusColor = (status) => {
    if (status === "active") return "text-green-400 bg-green-500/10 border-green-500/20";
    if (status === "pending") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-gray-400 bg-gray-500/10 border-gray-500/20";
  };

  return (
    <div className='min-h-screen w-full bg-[#111827] text-white'>
      <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
        <h1 className='text-xl md:ml-0 ml-9 font-bold'>Visitors</h1>
        <Logoutbtn />
      </div>

      <div className='p-2'>
        <div className='bg-[#1F2937] rounded-2xl shadow-xl border border-white/10 overflow-x-auto'>
          <table className='min-w-full'>
            <thead className="bg-white/5 text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">action</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (<tr >
                <td colSpan={4} className='text-center py-6 text-gray-400' >
                  No visitor Found
                </td>
              </tr>) : (
                visitors.map((v) => (
                  <tr key={v._id} className='border-t border-white/5 hover:bg-white/5 transition'>
                    <td className="px-6 py-4 font-medium"> {v.name} </td>
                    <td className="px-6 py-4 capitalize text-[#F59E0B] "> {v.email} </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs rounded-full border ${statusColor(v.status)}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-right ">
                      <MdPendingActions onClick={() => { updateVisitorStatus(v._id) }} className={statuscolor[v.status] || 'text-black '} /> </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Visitors