import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { FaLaptop, FaCogs, FaTable , FaTachometerAlt, FaFileContract, FaUsers, FaServicestack, FaUser, FaSignOutAlt} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase"; 
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
     <Link to="/" ></Link>; // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <aside id="left-panel" className="left-panel">
      <nav className="navbar navbar-expand-sm navbar-default">
        <div id="main-menu" className="main-menu collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active fs-3 fw-bold ">
              <Link to="/admin/">
              <FaTachometerAlt className="menu-icon" /> Dashboard
              </Link>
            </li>
            <li className="menu-item-has-children fs-3  fw-bold">
              <Link to="/admin/contracts">
              <FaFileContract className="menu-icon" /> Contracts
              </Link>
            </li>
            <li className="menu-item-has-children fs-3 fw-bold">
              <Link to="/admin/users">
                <FaUsers className="menu-icon" /> Users
              </Link>
            </li>

            <li className="menu-item-has-children fs-3 fw-bold">
              <Link to="/admin/services">
                <FaServicestack className="menu-icon" /> Services
              </Link>
            </li>
            <li className="menu-item-has-children fs-3  fw-bold">
              <Link to="/admin/profile">
                <FaUser className="menu-icon" /> Profile
              </Link>
            </li>
            <li className="menu-item-has-children fw-bold">
              <a className="" href="/" onClick={handleLogout}>
                <FaSignOutAlt className="menu-icon" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
