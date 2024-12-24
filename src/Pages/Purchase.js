import React from 'react'
import Sidenav from '../Components/Sidenav';
import { useState } from 'react';

const Purchase = () => {
  const [isSidebarCollapsed] = useState(true);

  return (
    <>
      <div className="d-flex">
        <Sidenav isCollapsed={isSidebarCollapsed} />
      </div>
      <div>
        Purchase page
      </div>
    </>
    
  )
}

export default Purchase
