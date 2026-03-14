import React, { useEffect, useState } from 'react'
import api from '../api/api'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { usePDF } from 'react-to-pdf'



const Singlepass = () => {
    const { toPDF, targetRef } = usePDF({ filename: 'visitor-pass.pdf' })
    const { id } = useParams()

    useEffect(() => {
        fetchrole()
        fetch()
    }, [])

    const [dets, setdets] = useState({})
    const [role, setRole] = useState([])

    const fetchrole = async () => {
        const res = await api.get('api/users/me')
        setRole(res.data.user.role)
    }

    const fetch = async () => {
        const res = await api.get(`/api/passes/view/${id}`)
        setdets(res.data)
       
    }



    return (
        <div className='w-full'>
            <div
                ref={targetRef}
                className="max-w-sm mx-auto m-25 rounded-xl shadow-lg  p-2"
                style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d1d5db",
                    color: "#111827"
                }}
            >
                <div className="text-center  border-b pb-2 mb-3">
                    <h2
                        className="text-xl font-bold"
                        style={{ color: "#1d4ed8" }}
                    >
                        VISITOR PASS
                    </h2>
                    <div className='flex justify-center '>
                        <img className=' rounded-full object-cover size-35' src={dets.details?.appointment?.photo} alt="" />

                    </div>
                </div>
                <div className='flex space-x-3'>
                    <div className="flex justify-center mb-4">
                        <img
                            src={dets.pass?.qrCode}
                            alt="QR Code"
                            className="w-36 h-36"
                        />
                    </div>
                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="font-extrabold ">Name:</span>{" "}
                            {dets.details?.appointment?.visitor?.name}

                        </p>

                        <p>
                            <span className="font-extrabold ">Purpose:</span>{" "}
                            {dets.details?.appointment?.purpose}
                        </p>

                        <p>
                            <span className="font-extrabold ">Visit Date:</span>{" "}
                            {dayjs(dets.pass?.validFrom).format("DD-MM-YYYY,  HH:mm")}
                        </p>

                        <p>
                            <span className="font-extrabold ">Valid Till:</span>{" "}
                            {dayjs(dets.pass?.validTo).format("DD-MM-YYYY, HH:mm")}
                        </p>

                        <p>
                            <span className="font-extrabold ">Issued By:</span>{" "}
                            {dets.details?.issuedBy?.name}
                        </p>
                    </div>
                </div>

                <div className="mt-1 text-center">
                    <p style={{ color: "#6b7280" }}>This pass is {dets.pass?.status}</p>
                </div>
            </div>
            <div className='flex justify-center items-center mt-3'>


                {role === 'visitor' ? <button onClick={toPDF} className="cursor-pointer text-center w-fit bg-blue-700 px-4 py-2 rounded-lg text-white text-lg">Download</button> : null}


            </div>


        </div>
    )
}

export default Singlepass