import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Demo from "../UserMenu/Demo.jsx";
import "./Navbar.css";
import { AppContext } from "./UserInfo.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_SERVR_URL}/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      setUser(null);
    }
  };
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">
          <Link to="/">
            ShareMate
          </Link>
        </h2>

        <ul className="nav-menu">
          {user ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Notes/Upload">Upload</Link>
              </li>
              <li>
                <Link to="/Notes/GetAllNotes">View</Link>
              </li>
              <li>
                <Demo OnLogout={handleLogout} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/user/Signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;