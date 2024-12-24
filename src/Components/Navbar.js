import React from 'react'
import Sidenav from './Sidenav'
import { Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div >
        <Sidenav/>
      </div>
      <div className=''>
        {<Outlet/>}
      </div>
    </div>
  )
}

export default Navbar