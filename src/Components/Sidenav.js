import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaList, FaRegListAlt, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineInventory, MdProductionQuantityLimits } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { NavLink, useNavigate } from 'react-router-dom';  
import './Sidenav.css';

const Sidenav = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();  

    const handleToggleSidebar = () => {
        setIsCollapsed(!isCollapsed);  
    };

    const handleLogout = () => {
        console.log("Logout button clicked");
        navigate("/login"); 
    };

    const handleIconClick = () => {
        if (window.innerWidth <= 768) {
            setIsCollapsed(true);  
        }
    };

    return (
        <div>
            <div className="topbar w-100 d-flex justify-content-between align-items-center p-3 text-black" style={{ backgroundColor:'dodgerblue', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <h3 className="m-0 fw-bold position-absolute" style={{ left: '50%', transform: 'translateX(-50%)', color:'white' }}>VIVEKANANDHA EDUCATIONAL INSTITUTIONS</h3>
                <div className="ms-auto d-flex align-items-center">
                    <button className="btn btn-light me-2" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                    <button className="btn btn-light" onClick={handleToggleSidebar}>
                        <FaBars />
                    </button>
                </div>
            </div>

            <div className="d-flex" style={{ marginTop: '70px' }}>
                <Navbar
                    className={`flex-column vh-100 p-3 bg-info ${isCollapsed ? "collapsed" : ""}`}
                    style={{ width: isCollapsed ? "0px" : "250px", transition: "width 0.3s ease", position: 'fixed', top: '70px' }}  // Sidebar starts below topbar
                >
                    {!isCollapsed && (
                        <Nav className="flex-column">
                            <Nav.Link as={NavLink} to="/dashboard" className="d-flex align-items-center" activeClassName="active" onClick={handleIconClick}>
                                <RxDashboard className="me-2" />
                                Dashboard
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/category" className="d-flex align-items-center" activeClassName="active" onClick={handleIconClick}>
                                <FaRegListAlt className="me-2" />
                                Category
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/subcategory" className="d-flex align-items-center" activeClassName="active" onClick={handleIconClick}>
                                <FaList className="me-2" />
                                Subcategory
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/inventory" className="d-flex align-items-center" activeClassName="active" onClick={handleIconClick}>
                                <MdOutlineInventory className="me-2" />
                                Inventory
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/stockinward" className="d-flex align-items-center" activeClassName="active" onClick={handleIconClick}>
                                <MdProductionQuantityLimits className="me-2" />
                                Stock Inward
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/stockoutward" className="d-flex align-items-center" activeClassName="active" onClick={handleIconClick}>
                                <IoCartOutline className="me-2" />
                                Stock Outward
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/purchasereturn" className="d-flex align-items-center" activeClassName="active" onClick={handleIconClick}>
                                <TbTruckReturn className="me-2" />
                                Purchase Return
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/reports" className="d-flex align-items-center" activeClassName="active" onClick={handleIconClick}>
                                <HiOutlineDocumentReport className="me-2" />
                                Reports
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar>

        
                <Container className="p-3" style={{ marginLeft: isCollapsed ? '0px' : '250px', width: '100%' }}>
                    {/* <h1>Main Content Area</h1>
                    <p>This is the sample page.</p> */}
                </Container>
            </div>
        </div>
    );
};

export default Sidenav;
