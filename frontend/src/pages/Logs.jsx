import React, { useEffect, useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import dayjs from 'dayjs'
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

export const Logs = () => {
    const navigate = useNavigate()
    const [log, setLog] = useState([])

    useEffect(() => {
        fectchlog()
    }, [])

    const fectchlog = async () => {
        const res = await api.get('/api/checklogs')
        console.log(res.data.checklog);
        setLog(res.data.checklog)

    }

    return (
        <div className='w-[85%] sm:w-4/5'>
            <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
                <h1 className='font-bold text-sm sm:text-xl'>Visitor's Logs</h1>
                <Logoutbtn />
            </div>
            <div className='mt-3 mx-6'>
                <button onClick={()=>navigate('/scanner')} className="px-4 py-2 rounded-lg text-white text-lg bg-blue-700 hover:bg-blue-800 transition ">Scan</button>
            </div>
            <div className='overflow-x-auto rounded-lg shadow-lg mt-3 '>
                <table className='min-w-full rounded-xl border border-gray-100'>
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="px-2 py-3 border-b  text-left ">check-in</th>
                            <th className="px-2 py-3 border-b  text-left ">check-out</th>
                            <th className="px-2 py-3 border-b  text-left ">check-in By</th>
                            <th className="px-2 py-3 border-b  text-left ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {log.length === 0 ? (<tr>
                            <td colSpan={8} className="text-center py-2">
                                No Data to Show
                            </td>
                        </tr>) : (
                            log.map((v) => (
                                <tr key={v._id} className="hover:bg-gray-50">
                                    <td className="px-2 py-3 ">{dayjs(v.checkInTime).format("HH:mm")}</td>
                                    <td className="px-2 py-3 ">{v.checkOutTime===null ?"visitor is inside ":dayjs(v.checkOutTime).format("HH:mm")}</td>
                                    <td className="px-2 py-3 ">{v.checkedInBy?.name}</td>
                                    <td className="px-2 py-3 "> <div className='flex space-x-4'>
                                        <GrFormView onClick={() => { navigate(`/passes/view/${v.pass}`) }} className='text-blue-600 text-2xl cursor-pointer' />
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
