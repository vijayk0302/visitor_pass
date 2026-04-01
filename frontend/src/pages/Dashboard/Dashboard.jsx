import React, { useEffect, useState } from 'react'
import Logoutbtn from '../../components/Logoutbtn'
import api from '../../api/api';
import { FaUser, FaUsers } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";

const Dashboard = () => {
  const [visitors, setVisitors] = useState(0)
  const [employee, setEmployee] = useState(0)
  const [appoint, setAppoint] = useState(0)
  const [pending, setPending] = useState(0)

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
      console.log(error)
    }
  }

  const Card = ({ title, value, icon }) => (
    <div className="flex items-center justify-between p-5 rounded-xl bg-[#1F2937] border border-white/10 shadow-lg hover:scale-[1.02] transition">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>
      <div className="text-[#F59E0B] text-2xl">
        {icon}
      </div>
    </div>
  )

  return (
    <div className='min-h-screen w-full bg-[#111827] text-white'>

   
      <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
        <div>
          <h1 className='text-xl md:ml-0 ml-9 font-bold'>Dashboard</h1>
          <p className='md:ml-0 ml-9 text-gray-400 text-sm'>Welcome back 👋</p>
        </div>
        <Logoutbtn />
      </div>

  
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>

        <Card
          title="Total Employees"
          value={employee}
          icon={<FaUser />}
        />

        <Card
          title="Total Visitors"
          value={visitors}
          icon={<FaUsers />}
        />

        <Card
          title="Pre Registrations"
          value={appoint}
          icon={<GiArchiveRegister />}
        />

        <Card
          title="Pending Users"
          value={pending}
          icon={<GiArchiveRegister />}
        />

      </div>
    </div>
  )
}

export default Dashboard;