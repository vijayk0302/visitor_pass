import React, { useEffect, useState } from 'react'
import api from '../api/api'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'



const Singlepass = () => {
    const { id } = useParams()
    useEffect(() => {
        fetch()
    }, [])

    const [dets, setdets] = useState({})
  
    const fetch = async () => {
        const pass = await api.get(`/api/passes/view/${id}`)
        setdets(pass.data)  
    }


    return (
        <div className="min-h-screen w-full bg-[#111827] text-white relative overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-br from-[#111827] via-[#111827] to-[#1F2937]" />

        <div className="absolute -top-25 -left-25 w-72 h-72 bg-[#F59E0B]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-25 -right-25 w-72 h-72 bg-[#F59E0B]/10 rounded-full blur-3xl" />

        <div className='relative flex justify-center items-center min-h-screen px-4'>
            <div className='flex justify-center my-15 sm:my-8'>
                
                
                <div style={{ backgroundColor: "#111827" }} className='relative rounded-sm shadow-2xl w-90 h-130 overflow-hidden '>
                    <h1 style={{ color: "#ffffff" }} className='pl-10 pt-10 text-xl'>Visi.co</h1>

                    <div style={{ backgroundColor: "#F59E0B" }} className='z-1 absolute bottom-0 w-full h-1/2'></div>
                    <div style={{ backgroundColor: "#ffffff" }} className='z-1 absolute w-200 h-67 top-34 -right-76.5 transform -rotate-45'></div>
                    <div style={{ backgroundColor: "#F59E0B" }} className='z-1 size-40 -top-20 -right-20 transform -rotate-45 absolute'></div>

                    <p className='absolute -rotate-90 font-black z-1 text-lg bottom-15' style={{ color: "#111827" }}>
                        {dets.pass?.status}
                    </p>
                    <p className='absolute -rotate-90 p-1 font-bold z-1 text-lg bottom-15' style={{ color: "#111827" }}>
                        Issuer : {dets.pass?.issuedBy?.name}
                    </p>

                    <div className='flex flex-col items-center justify-center'>
                        <img className='z-10 rounded-full object-cover mt-0 size-40' src={dets.pass?.appointment?.photo} alt="" />
                        <p className='z-10 mt-3 text-xl font-black' style={{ color: "#111827" }}>
                            {dets.pass?.appointment?.visitor?.name}
                        </p>
                        <p className='z-10 mt-3 text-sm font-bold' style={{ color: "#111827" }}>
                            VISITOR'S PASS
                        </p>
                        <p className='z-10 mt-3 text-sm font-bold' style={{ color: "#111827" }}>
                            {dets.pass?.appointment?.purpose}
                        </p>
                        <p className='z-10 mt-3 text-sm font-bold' style={{ color: "#111827" }}>
                            {dayjs(dets.pass?.validFrom).format("DD-MM-YYYY")}
                        </p>

                        <img
                            src={dets.pass?.qrCode}
                            alt="QR Code"
                            className="z-10 w-36 h-36"
                        />
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default Singlepass