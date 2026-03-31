import React from 'react'
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'



const Reject =lazy(()=>import('./components/Reject'))
const HomePage = lazy(() => import('./pages/HomePage'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const Profile = lazy(() => import('./pages/Profile'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Employee = lazy(() => import('./pages/Employee'))
const Admin = lazy(() => import('./pages/Admin'))
const Visitors = lazy(() => import('./pages/Visitors'))
const Editemployee = lazy(() => import('./pages/Editemployee'))
const Appointment = lazy(() => import('./pages/Appointment'))
const Appointmentfrom = lazy(() => import('./pages/Appointmentfrom'))
const Passes = lazy(() => import('./pages/Passes'))
const Singlepass = lazy(() => import('./pages/Singlepass'))
const Listvisitorpass = lazy(() => import('./pages/Listvisitorpass'))
const Logs = lazy(() => import('./pages/Logs'))

const MainLayout = lazy(() => import('./Layout/MainLayout'))
const Dashboardlayout = lazy(() => import('./Layout/Dashboardlayout'))

const Login = lazy(() => import('./Auth/Login'))
const Register = lazy(() => import('./Auth/Register'))
const Verify = lazy(() => import('./Auth/Verify'))
const Adminregister = lazy(() => import('./Auth/Adminregister'))

const ProtectedRoute = lazy(() => import('./context/ProtectedRoute'))
const ScanQR = lazy(() => import('./service/ScanQR'))

const Skeleton = () => {
  return (
    <div className="animate-pulse space-x-4 p-1">
      <div className="min-h-20 w-full bg-gray-300 rounded mb-4"></div>
      <div className="size-250 bg-gray-300 rounded mb-2"></div> 
    </div>
  );
};




function App() {


  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Skeleton/>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/register/admin' element={<Adminregister />} />
            </Route>

            <Route path='/verify' element={<Verify />}></Route>

            <Route element={<Dashboardlayout />}>

              <Route element={<ProtectedRoute allowedRoles={['admin', 'employee', 'security']} />}>
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

              <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}>
                <Route path="/appointments/:id" element={<Reject />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['admin', "employee", 'security']} />}>
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

              <Route element={<ProtectedRoute allowedRoles={['admin', 'security', 'employee', 'visitor']} />}>
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
        </Suspense>
      </BrowserRouter>

    </>
  )
}

export default App
