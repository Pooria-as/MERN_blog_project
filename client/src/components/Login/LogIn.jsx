import React from "react";
import { useState,useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/actions/Auth";
import Alert from "../Alert/Alert";
const LogIn = ({ login, IsAuthenticate }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  useEffect(() => {
    if (IsAuthenticate) {
      return navigate("/dashboard");
    }
  }, [IsAuthenticate]);

  const { email, password } = loginData;

  const handlChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

      login(email, password);
     
      

   
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <Alert />
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handlChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to="/singup">Sign Up</Link>
      </p>
    </section>
  );
};

const mapStateToProps = (state) => ({
  IsAuthenticate: state.auth.IsAuthenticate,
});

export default connect(mapStateToProps, { login })(LogIn);
