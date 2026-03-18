import {  useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })

    
    const handleform = async (e) => {
        e.preventDefault();
        const newuser = await api.post('/api/auth/create-user', user)
        console.log(newuser);
        navigate("/employees");
    }


    return (
        <div className='w-full'>
            <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
                <h1 className='md:ml-0 ml-9 font-bold text-sm sm:text-xl'>Admin's Dashboard</h1>
                <Logoutbtn />
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
            <div className='flex justify-center mt-4 space-x-3'>
            <button onClick={()=>navigate('/employees')} className="bg-[#2d4fa3] w-fit text-white px-4  py-3 rounded-sm cursor-pointer " >All Employees</button>
            <button onClick={()=>navigate('/dashboard')} className="bg-[#2d4fa3] w-fit text-white px-4  py-3 rounded-sm cursor-pointer " >Go to Dashboard</button>
            </div>
        </div>
    )
}

export default Admin