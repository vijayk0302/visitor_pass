import { Navigate ,Outlet } from 'react-router-dom'
import  {useAuth} from './Authcontext.jsx'

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login"  />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized"  />;
  }

  return <Outlet />;
}