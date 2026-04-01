import { useState } from 'react'
import Logoutbtn from '../components/Logoutbtn'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        role: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleform = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post('/api/auth/create-user', user);
            navigate("/employees");
        } catch (err) {
            toast(err.response?.data?.msg || "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen w-full bg-[#111827] text-white'>
            <div className='flex justify-between items-center px-6 py-4 border-b border-white/10'>
                <h1 className='text-xl md:ml-0 ml-9 font-bold'>Admin Panel</h1>
                <Logoutbtn />
            </div>

            <div className='flex justify-center items-center px-4 py-10'>
                <div className='w-full max-w-md bg-[#1F2937] p-8 rounded-2xl shadow-2xl border border-white/10'>
                    <h2 className='text-2xl font-bold text-center'>
                        Create User
                    </h2>
                    <p className='text-gray-400 text-sm text-center mt-1'>
                        Add a new employee or security member
                    </p>

                    <form onSubmit={handleform} className="space-y-5 mt-6">
                        <div>
                            <label className="text-sm text-gray-400">Name</label>
                            <input
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                placeholder='Enter name'
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Email</label>
                            <input
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder='Enter email'
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Role</label>
                            <select
                                value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                                className="w-full mt-1 px-4 py-2 bg-[#111827] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#F59E0B] outline-none"
                                required
                            >
                                <option value="" disabled>Select role</option>
                                <option value="employee">Employee</option>
                                <option value="security">Security</option>
                            </select>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                                {error}
                            </p>
                        )}

                        <button
                            disabled={loading}
                            className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold hover:bg-yellow-400 active:scale-95 transition disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Create User"}
                        </button>

                    </form>
                </div>
            </div>

            <div className='flex justify-center gap-4 pb-8'>
                <button
                    onClick={() => navigate('/employees')}
                    className="px-4 py-2 rounded-lg border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#111827] transition"
                >
                    View Employees
                </button>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
                >
                    Dashboard
                </button>
            </div>
        </div>
    )
}

export default Admin;