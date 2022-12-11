import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Landing = ({ isAuthenticated }) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-succes">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/singup" className="btn btn-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.IsAuthenticate,
});

export default connect(mapStateToProps, {})(Landing);
