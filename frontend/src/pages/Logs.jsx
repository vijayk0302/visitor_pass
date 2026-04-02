import React, { useEffect, useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api'
import dayjs from 'dayjs'
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import CsvDownloader from 'react-csv-downloader';

const Logs = () => {
    const navigate = useNavigate();
    const [log, setLog] = useState([]);
    const [search, setSearch] = useState("");

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
    const filterlogs = log.filter((u) => {
        const query = search.toLowerCase();

        const name = u.checkedInBy?.name || "";

        return name.toLowerCase().includes(query);
    });

    const [currentpage, setCurrentpage] = useState(1);
    const listperpage = 5

    const totalPages = Math.ceil(filterlogs.length / listperpage);
    const lastindex = currentpage * listperpage;
    const firstindex = lastindex - listperpage;
    const currentlists = filterlogs.slice(firstindex, lastindex)

    return (
        <div className='min-h-screen w-full bg-[#111827] text-white'>

            <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
                <h1 className='text-xl md:ml-0 ml-9 font-bold'>Visitor Logs</h1>
                <Logoutbtn />
            </div>

            <div className='flex sm:flex-row flex-col   justify-between'>
                <div className='px-6 space-x-4 mt-3'>
                    <button
                        onClick={() => navigate('/scanner')}
                        className="bg-[#F59E0B] text-[#111827] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                    >
                        Scan Visitor
                    </button>
                    <CsvDownloader
                        filename="myfile"
                        extension=".csv"
                        className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
                        datas={log}
                        text='Export CSV' />

                </div>
                <div className="relative w-full max-w-sm px-6 mt-3">
                    <FiSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='checked in by'
                        className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#F59E0B] outline-none"
                    />
                </div>
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
                            {filterlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">
                                        No logs available
                                    </td>
                                </tr>
                            ) : (
                                currentlists.map((v) => (
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
                <div className="flex flex-col left-25 sm:left-[50%] justify-center items-center gap-2 py-6">

                    <p className="text-center text-gray-400">
                        Page {currentpage} of {totalPages}
                    </p>
                    <div className='flex justify-center items-center gap-2'>

                        <button
                            onClick={() => setCurrentpage((prev) => prev - 1)}
                            disabled={currentpage === 1}
                            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {
                            Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setCurrentpage(num)}
                                    className={`px-3 py-1 rounded ${currentpage === num
                                        ? "bg-[#F59E0B] text-black"
                                        : "bg-gray-700"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}

                        <button
                            onClick={() => setCurrentpage((prev) => prev + 1)}
                            disabled={currentpage === totalPages}
                            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logs;