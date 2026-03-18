
import { NavLink } from 'react-router-dom'
import visi from '../assets/visi.png'

const Navbar = () => {
  return (
    <div className='flex w-full bg-[#111827] justify-between items-center px-5 py-2 shadow'>
      <NavLink to={'/'}><img className='size-12 rounded-4xl cursor-pointer' src={visi} alt="logo" /></NavLink>
        <div className='space-x-5'>
            <NavLink className='text-[#F9FAFB] hover:text-[#D97706]' to={'/login'}>Login</NavLink>
            <NavLink className='bg-[#F59E0B] py-2 px-4 text-white rounded' to={'/register'}>Register</NavLink>
        </div>
    </div>
  )
}

export default Navbar