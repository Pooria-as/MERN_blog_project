import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../Alert/Alert";
import { connect } from "react-redux";
import { setAlert } from "../../store/actions/Alert";
import { register } from "../../store/actions/Auth";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Register2 = ({ setAlert, register }) => {
  let navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { name, email, password, confirm_password } = registerData;

  const handlChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    const data = {
      name,
      email,
      password,
    };
    e.preventDefault();
    if (password !== confirm_password) {
      setAlert("Password doesn't match dude", "danger");
    } else {
      register(data);
      navigate("/");
      swal("Your registration was successfull !");
      // window.location.reload();

      console.log(localStorage.getItem("token"));
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <Alert />
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handlChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handlChange}
          />

          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={handlChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            onChange={handlChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default connect(null, { setAlert, register })(Register2);
