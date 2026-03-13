import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex w-full bg-[#111827] justify-between items-center px-5 py-5 shadow'>
        <h1 className='font-bold cursor-pointer text-xl text-[#F9FAFB]'><NavLink to={'/'}>Visi.co</NavLink></h1>
        <div className='space-x-5'>
            <NavLink className='text-[#F9FAFB] hover:text-[#D97706]' to={'/login'}>Login</NavLink>
            <NavLink className='bg-[#F59E0B] py-2 px-4 text-white rounded' to={'/register'}>Register</NavLink>
        </div>
    </div>
  )
}

export default Navbar