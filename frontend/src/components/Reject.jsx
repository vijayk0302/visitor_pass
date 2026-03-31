import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Reject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [remark, setRemark] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReject = async () => {
        if (!remark.trim()) {
            return setError("Remark is required");
        }
        setLoading(true);
        try {
            await api.put(
                `/api/appointments/reject-appointment/${id}`,
                { remark },
                { withCredentials: true }
            );
            navigate('/appointment');
        } catch (err) {
            toast.error(err.response?.data?.message || "Error rejecting");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#111827] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-[#1F2937] text-white p-6 rounded-2xl shadow-2xl border border-white/10">

                <h2 className="text-xl font-bold text-center">
                    Reject Appointment
                </h2>

                <p className="text-gray-400 text-sm text-center mt-1">
                    Provide a reason for rejection
                </p>

                
                <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter rejection reason..."
                    className="w-full mt-5 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg focus:ring-2 focus:ring-red-400 outline-none resize-none"
                    rows={4}
                />          
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleReject}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 active:scale-95 transition disabled:opacity-60"
                    >
                        {loading ? "Rejecting..." : "Reject"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Reject;