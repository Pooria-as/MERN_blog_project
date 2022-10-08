import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          
            <i className="fas fa-code"></i> DevConnector
          
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Developers</Link>
        </li>
        <li>
        <Link to="/singup">Register</Link>

        </li>
        <li>
        <Link to="/login">Log in</Link>

        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
