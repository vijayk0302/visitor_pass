import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const Reject = () => {
    const navigate=useNavigate()
    const { id } = useParams()
    const [remark, setRemark] = useState("");
    const [error, setError] = useState("");

    const handleReject = async () => {
        if (!remark.trim()) {
            return setError("Remark is required");
        }

        try {
            await api.put(
                `/api/appointments/reject-appointment/${id}`,
                { remark },
                { withCredentials: true }
            );
            navigate('/appointment')
  

        } catch (err) {
            setError(err.response?.data?.message || "Error rejecting");
        }
    };
    return (
        <div className="bg-opacity-40 w-full flex justify-center items-center">

            <div className="bg-white border p-6 rounded-lg w-80">
                <h2 className="text-lg font-bold mb-3">Reject Appointment</h2>

                <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Enter rejection reason..."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                />

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={()=>history.back()}>Cancel</button>
                    <button
                        onClick={handleReject}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Reject
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Reject