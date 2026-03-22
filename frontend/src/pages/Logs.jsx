import React, { useEffect, useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import dayjs from 'dayjs'
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const Logs = () => {
    const navigate = useNavigate();
    const [log, setLog] = useState([]);

    useEffect(() => {
        fectchlog();
    }, []);

    const fectchlog = async () => {
        const res = await api.get('/api/checklogs');
        setLog(res.data.checklog);
    };

    const statusBadge = (checkout) => {
        return checkout === null
            ? "text-green-400 bg-green-500/10 border-green-500/20"
            : "text-gray-400 bg-gray-500/10 border-gray-500/20";
    };

    return (
        <div className='min-h-screen w-full bg-[#111827] text-white'>

           
            <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
                <h1 className='text-xl md:ml-0 ml-9 font-bold'>Visitor Logs</h1>
                <Logoutbtn />
            </div>

           
            <div className='px-6 mt-4'>
                <button
                    onClick={() => navigate('/scanner')}
                    className="bg-[#F59E0B] text-[#111827] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                >
                    Scan Visitor
                </button>
            </div>

            
            <div className='p-6'>
                <div className='bg-[#1F2937] rounded-2xl shadow-xl border border-white/10 overflow-x-auto'>

                    <table className='min-w-full'>

                     
                        <thead className="bg-white/5 text-gray-400 text-sm">
                            <tr>
                                <th className="px-6 py-4 text-left">Check In</th>
                                <th className="px-6 py-4 text-left">Check Out</th>
                                <th className="px-6 py-4 text-left">Checked By</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Action</th>
                            </tr>
                        </thead>

                       
                        <tbody>
                            {log.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">
                                        No logs available
                                    </td>
                                </tr>
                            ) : (
                                log.map((v) => (
                                    <tr
                                        key={v._id}
                                        className="border-t border-white/5 hover:bg-white/5 transition"
                                    >

                                        
                                        <td className="px-6 py-4 font-medium">
                                            {dayjs(v.checkInTime).format("HH:mm")}
                                        </td>

                                     
                                        <td className="px-6 py-4 text-gray-400">
                                            {v.checkOutTime
                                                ? dayjs(v.checkOutTime).format("HH:mm")
                                                : "--"}
                                        </td>

                                     
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                            {v.checkedInBy?.name || "System"}
                                        </td>

                                      
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs whitespace-nowrap rounded-full border ${statusBadge(v.checkOutTime)}`}>
                                                {v.checkOutTime ? "Checked Out" : "Inside"}
                                            </span>
                                        </td>

                                      
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => navigate(`/passes/view/${v.pass}`)}
                                                className="p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20 transition"
                                            >
                                                <GrFormView />
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Logs;