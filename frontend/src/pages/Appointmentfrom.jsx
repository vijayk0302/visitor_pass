import React, { useEffect, useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Appointmentfrom = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        phone: "",
        idproof: "",
        visitDate: "",
        purpose: ""
    })

    const [photo, setPhoto] = useState(null);

    const fetchuser = async () => {
        const res = await api.get('/api/users/me')
        setFormdata((prev) => ({
            ...prev,
            name: res.data.user.name,
            email: res.data.user.email,
        }))

    }

    const handlesubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault();
            const data = new FormData();
            data.append("name", formdata.name);
            data.append("email", formdata.email);
            data.append("phone", formdata.phone);
            data.append("idproof", formdata.idproof);
            data.append("visitDate", formdata.visitDate);
            data.append("purpose", formdata.purpose);

            data.append("photo", photo);

            await api.post("/api/appointments/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert('the appointment is booked')
            navigate("/profile");

        } catch (error) {
            alert(error.message )

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchuser()
    }, [])
    return (
        <div className='w-full'>
            <div className='bg-gray-200 flex justify-between items-center shadow-lg p-4'>
                <h1 className='sm:ml-0 ml-9 font-bold text-sm sm:text-xl'>Appiontment</h1>
                <Logoutbtn />
            </div>
            <div className="flex mt-6 items-center justify-center">
                <div className="w-fit h-fit md:w-100 p-10  shadow-lg  rounded-lg">
                    <h2 className="text-center font-bold mb-6 lg:text-2xl text-xl flex-col items-center ">Appointment Details</h2>
                    <form method='post' encType="multipart/form-data" onSubmit={handlesubmit}>
                        <span className="text-sm mb-2 block">Name</span>
                        <input
                            value={formdata.name} disabled
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            placeholder="Name"

                        />
                        <span className=" text-sm mb-2 block">Email</span>
                        <input
                            value={formdata.email} disabled
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            type="Email"
                            placeholder="Email"

                        />
                        <span className=" text-sm mb-2 block">Phone</span>
                        <input
                            value={formdata.phone}
                            onChange={(e) => setFormdata({ ...formdata, phone: e.target.value })}
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            type="tel"
                            placeholder="Phone"
                            maxLength='10'


                        />
                        <span className=" text-sm mb-2 block">Photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            placeholder="Photo"

                        />
                        <span className=" text-sm mb-2 block">ID Proof</span>
                        <input
                            value={formdata.idproof}
                            onChange={(e) => setFormdata({ ...formdata, idproof: e.target.value })}
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            type="text"
                            placeholder="Submit Document"

                        />
                        <span className=" text-sm mb-2 block">Date of visit</span>
                        <input
                            value={formdata.visitDate}
                            onChange={(e) => setFormdata({ ...formdata, visitDate: e.target.value })}
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            type="date"
                            placeholder="Date ...."

                        />
                        <span className=" text-sm mb-2 block">Purpose</span>
                        <input
                            value={formdata.purpose}
                            onChange={(e) => setFormdata({ ...formdata, purpose: e.target.value })}
                            className="px-3 w-full py-2 mb-6 block bg-gray-200 rounded-lg border outline-blue-400"
                            type="text"
                            placeholder="Purpose for visit"

                        />

                        <button disabled={loading} className="bg-[#2d4fa3] w-full text-white px-3  py-2 rounded-[50px] cursor-pointer disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">{loading ? "Please wait..." : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Appointmentfrom