import React from "react";
import { LogIn, User } from "lucide-react";
import logoImage from "../assets/centificglobal_logo.jpeg";
import "./navBar.css"; // import CSS file
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <img src={logoImage} alt="Centific Global" className="navbar-logo" />
        <h1 className="navbar-title">Centific</h1>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <Link to="/login" className="navbar-btn">
            <LogIn size={18} /> Login
        </Link>
        <button className="navbar-btn">
          <User size={18} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
