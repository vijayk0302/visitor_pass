import { Navigate ,Outlet } from 'react-router-dom'
import  {useAuth} from './Authcontext.jsx'

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();
 
  if (loading) return <div className='bg-red-500'>Loading...</div>;


  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  if (!allowedRoles.includes(user.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}