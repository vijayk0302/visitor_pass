import  { useState } from 'react'
import Logoutbtn from "../components/Logoutbtn";
import { useEffect } from 'react';
import api from '../api/api'
import { useParams } from 'react-router-dom';
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'


const Listvisitorpass = () => {
    const  navigate=useNavigate()

    const { id } = useParams();
 
    const [visitor, setVisitor] = useState([])

    useEffect(() => {
        fetchpassdata()
    }, []);

  
    const fetchpassdata = async () => {
        const passes = await api.get(`/api/passes/visitor/my-passes/${id}`)
        setVisitor(passes.data);

    }

    return (
        <div className='w-full'>
            <div className="bg-gray-200 flex justify-between items-center shadow-lg p-4">
                <h1 className="sm:ml-0 ml-9 font-bold">your passes </h1>
                <Logoutbtn />
            </div>
            <div className='overflow-x-auto mt-6 p-2'>
                <table className='min-w-full border border-gray-200 rounded-lg'>
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 py-3 border-b  text-left ">vaild till</th>
                            <th className="px-2 py-3 border-b  text-left ">Issued By</th>
                            <th className="px-2 py-3 border-b  text-left ">Status</th>
                            <th className="px-2 py-3 border-b  text-left ">view</th>
                        </tr>
                    </thead>
                    <tbody >
                        {visitor.length === 0 ? (<tr >
                            <td colSpan={4} className='text-center py-2' >
                                No Passes Found
                            </td>
                        </tr>) : (
                            visitor.map((v) => (
                                <tr key={v._id} className='hover:bg-gray-50'>
                                    <td className="px-2 py-3 text-left "> {dayjs(v.validTo).format("DD-MM-YYYY")} </td>
                                    <td className="px-2 py-3 text-left "> {v.issuedBy?.name} </td>
                                    <td className="px-2 py-3 text-left "> {v.status} </td>
                                    <td className="px-2 py-3 "> <div className='flex space-x-4'>
                                        <GrFormView onClick={() => { navigate(`/passes/view/${v._id}`) }} className='text-blue-600 text-2xl cursor-pointer' />
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

export default Listvisitorpass