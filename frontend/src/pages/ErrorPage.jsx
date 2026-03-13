import React from 'react'
import { NavLink } from 'react-router-dom'
import err from '../assets/err.jpg'

const ErrorPage = () => {
  return (
    <div className="min-h-fit mt-20 text-center ">
      <div className='text-center mt-4'>
        <h1 className='text-5xl'>404</h1>
        <p className='text-xl'>Page not found</p>
        <p className='text-xl'>The page you are looking for does not exist</p>
        <div className='mt-6'>
          <NavLink className='bg-[#F59E0B] hover:bg-[#D97706] px-3 py-2 rounded' to={'/'}>Home</NavLink>
        </div>
      </div>
      <div className='mt-5'>
        <img className='lg:w-100 inline' src={err} alt="" />
      </div>

    </div>
  )
}

export default ErrorPage