import React from 'react'
import Logoutbtn from '../components/Logoutbtn'
import { useEffect, useState } from 'react'
import api from '../api/api';
import { FaUser, FaUsers } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";

const Dashboard = () => {
  const [visitors, setVisitors] = useState('')
  const [employee, setEmployee] = useState('')
  const [appoint, setAppoint] = useState('')
  const [pending, setPending] = useState('')
  
  useEffect(() => {
    totalvisitors()
  }, [])

  const totalvisitors = async () => {
    try {
      
      const totalemploye = await api.get('/api/dashboard/employees')
      const visitors = await api.get('/api/dashboard/visitors')
      const count = await api.get('/api/dashboard/pending')
      const appointments = await api.get('/api/dashboard/stats')
       
      setAppoint(appointments.data.countap)
      setPending(count.data.pending)
      setVisitors(visitors.data.visitors)
      setEmployee(totalemploye.data.totalemployess)  

    } catch (error) {

    }
  }
  return (
    <div className='w-full' >
      <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
        <div className='md:ml-0 ml-9'>
          <h1 className='font-bold text-sm sm:text-xl'>Dashboard Overview</h1>
          <p>welcome back</p>
        </div>
        <Logoutbtn />
      </div>
      <div className='flex w-full flex-wrap p-4 gap-2 justify-between mt-3 '>
        <div className='flex justify-around p-7 sm:min-w-62.5 min-w-full rounded-lg bg-green-400'>
          <div>
            <FaUser className='inline md:text-xl sm:text-sm' />  Total employees
          </div>
          <div>{employee}</div>
        </div>
        <div className='flex justify-around p-7 sm:min-w-62.5 min-w-full rounded-lg bg-blue-500'>
          <div>
            <FaUsers className='inline text-2xl ' />  Total visitors
          </div>
          <div>
            {visitors}
          </div>
        </div>
        <div className='flex justify-around p-7 sm:min-w-62.5 min-w-full rounded-lg bg-yellow-500'>
          <div>
            <GiArchiveRegister className='inline text-2xl' />  Total pre register
          </div>
          <div>
            {appoint}
          </div>
        </div>
        <div className='flex justify-around p-7 sm:min-w-62.5 min-w-full rounded-lg bg-red-500'>
          <div>
            <GiArchiveRegister className='inline text-2xl' />  Pending users
          </div>
          <div>
            {pending}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard