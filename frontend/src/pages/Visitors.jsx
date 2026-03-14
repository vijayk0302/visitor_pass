import React, { useEffect, useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import { MdPendingActions } from "react-icons/md";



const Visitors = () => {

  const statuscolor={
    active:'text-green-600 text-xl cursor-pointer',
    pending:'text-yellow-600 text-xl cursor-pointer'
  }
  const [visitors, setVisitors] = useState([])
  useEffect(() => {
    fetchvisitordata()
  }, [])

  const fetchvisitordata = async () => {
    const res = await api.get(`/api/users/visitor`)
    setVisitors(res.data.visitor)
  }
  const updateVisitorStatus=async(id)=>{
    await api.put(`/api/users/visitor/status/${id}`)
    fetchvisitordata()

  }


  return (
    <div className='w-full'>
      <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
        <h1 className='font-bold text-sm sm:text-xl'>Visitors</h1>
        <Logoutbtn />
      </div>
      <div className='overflow-x-auto  shadow-lg mt-6 p-2'>
        <table className='min-w-full border border-gray-200 rounded-xl'>
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-3 border-b  text-left ">Name</th>
              <th className="px-2 py-3 border-b  text-left ">Email</th>
              <th className="px-2 py-3 border-b  text-left ">Status</th>              
              <th className="px-2 py-3 border-b  text-left ">action</th>              
            </tr>
          </thead>
          <tbody>
            {visitors.length===0 ?( <tr >
              <td colSpan={4} className='text-center py-2' >
                No visitor Found
              </td>
            </tr> ):(
              visitors.map((v)=>(
                <tr key={v._id} className='hover:bg-gray-50'>
                  <td className="px-2 py-3 text-left "> {v.name} </td>
                  <td className="px-2 py-3 text-left "> {v.email} </td>
                  <td className="px-2 py-3 text-left "> {v.status} </td>
                  <td className="px-2 py-3 text-right "> 
                    <MdPendingActions onClick={()=>{updateVisitorStatus(v._id)}} className={statuscolor[v.status]||'text-black '} /> </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Visitors