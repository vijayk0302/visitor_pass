import { Navigate ,Outlet } from 'react-router-dom'
import  {useAuth} from './Authcontext.jsx'

const Publicroutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) return <Navigate to="/profile"  />;

  return <Outlet />;
};

export default Publicroutes;