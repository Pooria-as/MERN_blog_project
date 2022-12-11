import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../store/actions/Auth";
import { FaSignOutAlt } from "react-icons/fa";

const NavBar = ({ logout, loading, IsAuthenticate }) => {
  const guest = (
    <ul>
      <li>
        <a href="/">Developers</a>
      </li>
      <li>
        <Link to="/singup">Register</Link>
      </li>
      <li>
        <Link to="/login">Log in</Link>
      </li>
    </ul>
  );

  const auth = (
    <ul>
      <li>
        <Link to="/dashboard">Dashborad </Link>
      </li>
      <li>
        <Link onClick={logout} to="/login">
          <FaSignOutAlt />
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <>{IsAuthenticate ? auth : guest}</>}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  IsAuthenticate: state.auth.IsAuthenticate,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(NavBar);
