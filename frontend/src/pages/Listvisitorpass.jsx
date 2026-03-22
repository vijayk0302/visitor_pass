import { useState } from 'react'
import Logoutbtn from "../components/Logoutbtn";
import { useEffect } from 'react';
import api from '../api/api'
import { useParams } from 'react-router-dom';
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'


const Listvisitorpass = () => {
    const navigate = useNavigate()

    const { id } = useParams();

    const [visitor, setVisitor] = useState([])

    useEffect(() => {
        fetchpassdata()
    }, []);


    const fetchpassdata = async () => {
        const passes = await api.get(`/api/passes/visitor/my-passes/${id}`)
        setVisitor(passes.data);

    }
     const statusColor = (status) => {
        if (status === "active") return "text-green-400 bg-green-500/10 border-green-500/20";
        if (status === "used") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    };

    return (
        <div className='min-h-screen w-full bg-[#111827] text-white'>
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                <h1 className="text-xl md:ml-0 ml-9 font-bold">Your passes </h1>
                <Logoutbtn />
            </div>
            <div className='p-6'>
                <div className='bg-[#1F2937] rounded-2xl shadow-xl border border-white/10 overflow-x-auto'>
                    <table className='min-w-full'>
                        <thead className="bg-white/5 text-gray-400 text-sm">
                            <tr>
                                <th className="px-6 py-4 text-left whitespace-nowrap">vaild till</th>
                                <th className="px-6 py-4 text-left ">Issued By</th>
                                <th className="px-6 py-4 text-left ">Status</th>
                                <th className="px-6 py-4 text-left">view</th>
                            </tr>
                        </thead>
                        <tbody >
                            {visitor.length === 0 ? (<tr >
                                <td colSpan={4} className='text-center py-6 text-gray-400' >
                                    No Passes Found
                                </td>
                            </tr>) : (
                                visitor.map((v) => (
                                    <tr key={v._id} className='border-t border-white/5 hover:bg-white/5 transition'>
                                        <td className="px-6 py-4 text-left whitespace-nowrap"> {dayjs(v.validTo).format("DD-MM-YYYY")} </td>
                                        <td className="px-6 py-4 text-left "> {v.issuedBy?.name} </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs rounded-full border ${statusColor(v.status)}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-left"> <button 
                                        className="p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20 transition"
                                        onClick={() => { navigate(`/passes/view/${v._id}`) }}>
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

export default Listvisitorpass