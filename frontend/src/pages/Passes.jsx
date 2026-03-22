import React, { useEffect, useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'

const Passes = () => {
    const navigate = useNavigate()
    const [passes, setPasses] = useState([])

    useEffect(() => {
        fetchallpasses()
    }, [])

    const fetchallpasses = async () => {
        const res = await api.get('/api/passes/all')
        setPasses(res.data.pass);
    }

    const statusColor = (status) => {
        if (status === "active") return "text-green-400 bg-green-500/10 border-green-500/20";
        if (status === "used") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    };
    return (
        <div className='min-h-screen w-full bg-[#111827] text-white'>
            <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
                <h1 className='text-xl md:ml-0 ml-9 font-bold'>Passes</h1>
                <Logoutbtn />

            </div>
            <div className='p-2'>
                <div className='bg-[#1F2937] rounded-2xl shadow-xl border border-white/10 overflow-x-auto'>
                    <table className='min-w-full'>
                        <thead className="bg-white/5 text-gray-400 text-sm">
                            <tr >
                                <th className="px-6 py-4 text-left whitespace-nowrap ">Day of visit</th>
                                <th className="px-6 py-4 text-left whitespace-nowrap  ">issued by</th>
                                <th className="px-6 py-4 text-left ">Status</th>
                                <th className="px-6 py-4 text-left whitespace-nowrap ">Valid from</th>
                                <th className="px-6 py-4 text-left whitespace-nowrap  ">Valid to</th>
                                <th className="px-6 py-4 text-left ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passes.length === 0 ? (<tr>
                                <td colSpan={6} className="text-center py-6 text-gray-400">
                                    No Passes Found
                                </td>
                            </tr>) : (
                                passes.map((v) => (
                                    <tr key={v._id} className="border-t border-white/5 hover:bg-white/5 transition">
                                        <td className="px-6 py-4  text-[#F59E0B] whitespace-nowrap"> {dayjs(v.validTo).format("DD-MM-YYYY")} </td>
                                        <td className="px-6 py-4"> {v.issuedBy.name} </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs rounded-full border ${statusColor(v.status)}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 "> {dayjs(v.validFrom).format("HH:mm")} </td>
                                        <td className="px-6 py-4"> {dayjs(v.validTo).format("HH:mm")} </td>
                                        <td className="px-6 py-4 "> <button 
                                        className="p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20 transition"
                                        onClick={() => { navigate(`/passes/view/${v._id}`) }} >
                                            <GrFormView   />
                                        </button> </td>
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

export default Passes