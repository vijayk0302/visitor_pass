import React, { useEffect, useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'

export const Passes = () => {
 const  navigate=useNavigate()
    const [passes, setPasses] = useState([])

    useEffect(() => {
        fetchallpasses()
    }, [])
    const fetchallpasses = async () => {
        const res = await api.get('/api/passes')
        setPasses(res.data.pass);
       
    }
    return (
        <div className='w-full'>
            <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
                <h1 className='font-bold text-sm sm:text-xl'>Passes</h1>
                <Logoutbtn />

            </div>
            <div className='overflow-x-auto rounded-lg shadow-lg mt-6 p-2'>
                <table className='min-w-full rounded-xl border border-gray-100'>
                    <thead className="bg-gray-300">
                        <tr >
                            <th className="px-2 py-3 border-b  text-left ">Day of visit</th>
                            <th className="px-2 py-3 border-b text-left ">issued by</th>
                            <th className="px-2 py-3 border-b text-left ">Status</th>
                            <th className="px-2 py-3 border-b  text-left ">Valid from</th>
                            <th className="px-2 py-3 border-b text-left ">Valid to</th>
                            <th className="px-2 py-3 border-b text-left ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passes.length === 0 ? (<tr>
                            <td colSpan={6} className="text-center py-2">
                                No Passes Found
                            </td>
                        </tr>) : (
                            passes.map((v) => (
                                <tr key={v._id} className="hover:bg-gray-50">
                                    <td className="px-2 py-3 "> {dayjs(v.validTo).format("DD-MM-YYYY")} </td>
                                    <td className="px-2 py-3 "> {v.issuedBy.name} </td>
                                    <td className="px-2 py-3 "> {v.status} </td>
                                    <td className="px-2 py-3 "> {dayjs(v.validFrom).format("HH:mm")} </td>
                                    <td className="px-2 py-3 "> {dayjs(v.validTo).format("HH:mm")} </td>
                                    <td className="px-2 py-3 "> <div className='flex space-x-4'>
                                        <GrFormView  onClick={() => { navigate(`/passes/view/${v._id}`) }} className='text-blue-600 text-2xl cursor-pointer'/>
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
