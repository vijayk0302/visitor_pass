import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'
import { useState, useEffect } from 'react'

const Editemployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  });

  const fetchUser = async () => {
    try {
      const res = await api.get(`/api/users/${id}`);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/api/users/${id}`, user);
      navigate("/employees");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div className="w-full bg-[#111827] flex justify-center items-center min-h-screen px-4">
      
      <div className="w-full max-w-md bg-[#111827] text-white p-8 rounded-2xl shadow-2xl border border-white/10">

        <h2 className="text-2xl font-bold text-center">
          Edit Employee
        </h2>
        <p className="text-gray-400 text-sm text-center mt-1">
          Update employee details
        </p>

        <form onSubmit={handlesubmit} className="mt-6 space-y-5">

         
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Enter name"
              className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
            />
          </div>

        
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter email"
              className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#F59E0B] outline-none"
            />
          </div>

  
          <div>
            <label className="text-sm text-gray-400">Role</label>
            <select
              value={user.role}
              onChange={(e) =>
                setUser({ ...user, role: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#F59E0B] outline-none"
            >
              <option value="employee">Employee</option>
              <option value="security">Security</option>
            </select>
          </div>

         
          <div>
            <label className="text-sm text-gray-400">Status</label>
            <select
              value={user.status}
              onChange={(e) =>
                setUser({ ...user, status: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#F59E0B] outline-none"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#F59E0B] text-[#111827] py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-400 active:scale-95 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Employee"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Editemployee;