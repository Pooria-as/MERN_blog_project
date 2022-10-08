import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Alert } from "react-bootstrap";

const LogIn = () => {
  const FormikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please Enter The Email"),
      password: Yup.string().required("Please Enter The Password"),
    }),
    onSubmit: (values) => console.log(values),
  });
  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={FormikRegister.handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            {...FormikRegister.getFieldProps("email")}
            required
          />

          {FormikRegister.errors.email && FormikRegister.touched.email ? (
            <Alert variant="danger">
              <h4>{FormikRegister.errors.email}</h4>
            </Alert>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...FormikRegister.getFieldProps("password")}
          />
           {FormikRegister.errors.password && FormikRegister.touched.password ? (
            <Alert variant="danger">
              <h4>{FormikRegister.errors.password}</h4>
            </Alert>
          ) : null}
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

export default LogIn;
