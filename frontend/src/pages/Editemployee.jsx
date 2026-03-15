import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/api'
import { useState, useEffect } from 'react'

const Editemployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  })

  const fetchUser = async () => {
    const res = await api.get(`/api/users/${id}`);
    setUser(res.data.user);

  }

  const handlesubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();
      await api.put(`/api/users/${id}`, user);
      navigate("/employees");

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchUser()
  }, [id])

  return (
    <div className="w-full p-6 flex justify-center items-center flex-col">
      <div className='w-fit p-2 rounded-xl shadow-lg border'>
        <h2 className="text-xl text-center font-bold mb-4">Edit Employee Details</h2>

        <form onSubmit={handlesubmit} className="space-y-4">

          <input
            placeholder='Update Name'
            value={user.name}
            className="border p-2 w-full"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <select
            className="border p-2 w-full"
            value={user.role}
            onChange={(e) =>
              setUser({ ...user, role: e.target.value })
            }
          >
            <option value="employee">Employee</option>
            <option value="security">Security</option>
          </select>

          <select
            className="border p-2 w-full"
            value={user.status}
            onChange={(e) =>
              setUser({ ...user, status: e.target.value })
            }
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>

          <div className='flex justify-center items-center'>
            <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editemployee