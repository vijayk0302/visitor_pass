import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from '../src/Auth/Login'
import ErrorPage from './pages/ErrorPage'
import Register from '../src/Auth/Register'
import MainLayout from './components/MainLayout'
import Dashboardlayout from './Layout/Dashboardlayout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Employee from './pages/Employee'
import Admin from './pages/Admin'
import Visitors from './pages/Visitors'
import Editemployee from './pages/Editemployee'
import Appointment from './pages/Appointment'
import Appointmentfrom from './pages/Appointmentfrom'
import { Passes } from './pages/Passes'
import Singlepass from './pages/Singlepass'
import ProtectedRoute from './context/ProtectedRoute'
import Listvisitorpass from './pages/Listvisitorpass'
import { Logs } from './pages/Logs'
import ScanQR from './service/ScanQR'




function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route element={<Dashboardlayout />}>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'employee', 'security', 'visitor']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'employee', 'security', 'visitor']} />} >
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/employees" element={<Employee />} />
            </Route>


            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}>
              <Route path="/visitors" element={<Visitors />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}>
              <Route path="/appointment" element={<Appointment />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'security']} />}>
              <Route path="/passes" element={<Passes />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'security']} />}>
              <Route path="/log" element={<Logs />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'security']} />}>
              <Route path="/scanner" element={<ScanQR />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['visitor']} />}>
              <Route path="/my-pass/:id" element={<Listvisitorpass />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'security','visitor']} />}>
              <Route path="/passes/view/:id" element={<Singlepass />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['visitor']} />}>
              <Route path="/appointmentform" element={<Appointmentfrom />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/employees/edit/:id" element={<Editemployee />} />
            </Route>
          </Route>


          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
