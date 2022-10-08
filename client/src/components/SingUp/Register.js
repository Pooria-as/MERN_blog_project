import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Alert } from "react-bootstrap";
import axios from "axios";

const Register = () => {
  const FormikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter The Name"),
      email: Yup.string().email().required("Please Enter The Email"),
      password: Yup.string().required("Please Enter The Password"),
      confirm_password: Yup.string()
        .label("confirm password")
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      await axios
        .post("/api/users", data, {
          "Content-Type": "application/json",
        })
        .then((res) => console.log(res.data.token));
    },
  });
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={FormikRegister.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            {...FormikRegister.getFieldProps("name")}
          />

          {FormikRegister.errors.name && FormikRegister.touched.name ? (
            <Alert variant="danger">
              <h4>{FormikRegister.errors.name}</h4>
            </Alert>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            {...FormikRegister.getFieldProps("email")}
          />

          {FormikRegister.errors.email && FormikRegister.touched.email ? (
            <Alert variant="danger">
              <h4>{FormikRegister.errors.email}</h4>
            </Alert>
          ) : null}
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
            {...FormikRegister.getFieldProps("password")}
            minLength="6"
          />

          {FormikRegister.errors.password && FormikRegister.touched.password ? (
            <Alert variant="danger">
              <h4>{FormikRegister.errors.password}</h4>
            </Alert>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            minLength="6"
            {...FormikRegister.getFieldProps("confirm_password")}
          />

          {FormikRegister.errors.confirm_password &&
          FormikRegister.touched.confirm_password ? (
            <Alert variant="danger">
              <h4>{FormikRegister.errors.confirm_password}</h4>
            </Alert>
          ) : null}
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
