import { useEffect, useState } from 'react'
import { FaUser, FaUsers } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [visitors, setVisitors] = useState('')
    const [employee, setEmployee] = useState('')
    const [appoint, setAppoint] = useState('')
    const [pending, setPending] = useState('')
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })

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
    const handleform = async (e) => {
        e.preventDefault();
        const newuser = await api.post('/api/auth/create-user', user)
        console.log(newuser);
        navigate("/employees");
    }


    return (
        <div className='w-full'>
            <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
                <h1 className='font-bold text-sm sm:text-xl'>Admin's Dashboard</h1>
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
            <div className='flex md:flex-row sm:p-0 p-3 bg-gray-100 justify-center mt-2 items-center'>
                <div className='w-100 mt-10 text-center p-5 rounded-xl shadow-lg border'>
                    <h1 className='text-center font-bold text-2xl'>Create a new User </h1>
                    <form onSubmit={handleform} className="space-y-4 mt-6" >
                        <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder='Enter Name' className="border rounded-xl p-2 w-full" />
                        <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Enter Email' className="border rounded-xl p-2 w-full" />
                        <input type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Enter Password' className="border rounded-xl p-2 w-full" />
                        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}
                            className="border rounded-xl p-2 w-full"

                        >
                            <option value="">Select role</option>
                            <option value="employee">Employee</option>
                            <option value="security">Security</option>
                        </select>
                        <button className="bg-green-600 text-white px-4 py-2 rounded">
                            Add
                        </button>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Admin