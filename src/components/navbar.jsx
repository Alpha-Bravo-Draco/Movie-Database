import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <Link to="/" className="nav-link">
            Movie App
          </Link>
        </div>
        <div className="spacer"></div>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorite
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
