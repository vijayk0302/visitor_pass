import React, { useEffect, useState } from 'react'
import Logoutbtn from '../../components/Logoutbtn'
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Appointmentfrom = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        phone: "",
        idproof: "",
        visitDate: "",
        purpose: ""
    });

    const [photo, setPhoto] = useState(null);

    const fetchuser = async () => {
        const res = await api.get('/api/users/me');
        setFormdata((prev) => ({
            ...prev,
            name: res.data.user.name,
            email: res.data.user.email,
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.keys(formdata).forEach((key) => {
                data.append(key, formdata[key]);
            });

            data.append("photo", photo);

            await api.post("/api/appointments/create", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success('Appointment is booked')
            navigate("/profile");

        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchuser();
    }, []);

    return (
        <div className='min-h-screen w-full bg-[#111827] text-white'>

          
            <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
                <h1 className='text-xl md:ml-0 ml-9 font-bold'>Book Appointment</h1>
                <Logoutbtn />
            </div>

           
            <div className="flex justify-center px-4 py-10">
                <div className="w-full max-w-md bg-[#1F2937] p-8 rounded-2xl shadow-2xl border border-white/10">

                    <h2 className="text-2xl font-bold text-center">
                        Appointment Details
                    </h2>
                    <p className="text-gray-400 text-sm text-center mt-1">
                        Fill in your visit information
                    </p>

                    <form onSubmit={handlesubmit} className="mt-6 space-y-5">

                       
                        <div>
                            <label className="text-sm text-gray-400">Name</label>
                            <input
                                value={formdata.name}
                                disabled
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg text-gray-400"
                            />
                        </div>

                       
                        <div>
                            <label className="text-sm text-gray-400">Email</label>
                            <input
                                value={formdata.email}
                                disabled
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg text-gray-400"
                            />
                        </div>

                      
                        <div>
                            <label className="text-sm text-gray-400">Phone</label>
                            <input
                                value={formdata.phone}
                                onChange={(e) => setFormdata({ ...formdata, phone: e.target.value })}
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                type="tel"
                                maxLength="10"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>

                       
                        <div>
                            <label className="text-sm text-gray-400">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg file:bg-[#F59E0B] file:text-[#111827] file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer"
                                required
                            />
                        </div>

                        
                        <div>
                            <label className="text-sm text-gray-400">ID Proof</label>
                            <input
                                value={formdata.idproof}
                                onChange={(e) => setFormdata({ ...formdata, idproof: e.target.value })}
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                placeholder="Enter ID proof"
                                required
                            />
                        </div>

                       
                        <div>
                            <label className="text-sm text-gray-400">Visit Date</label>
                            <input
                                value={formdata.visitDate}
                                onChange={(e) => setFormdata({ ...formdata, visitDate: e.target.value })}
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                type="date"
                                required
                            />
                        </div>

                        
                        <div>
                            <label className="text-sm text-gray-400">Purpose</label>
                            <input
                                value={formdata.purpose}
                                onChange={(e) => setFormdata({ ...formdata, purpose: e.target.value })}
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                placeholder="Purpose of visit"
                                required
                            />
                        </div>

                        
                        <button
                            disabled={loading}
                            className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold hover:bg-yellow-400 active:scale-95 transition disabled:opacity-60"
                        >
                            {loading ? "Booking..." : "Book Appointment"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Appointmentfrom;