import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';

const Dashboardlayout = () => {
    return (
            <div className='flex'>
                <Sidebar />               
                <Outlet  />                
            </div>       
    )
}

export default Dashboardlayout