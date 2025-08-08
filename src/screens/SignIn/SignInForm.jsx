import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/SignUpForm.css";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await axios.post(
        "https://api-qa.klippify.com/api/login",
        {
          email: values.email,
          password: values.password,
          role: "creator",
        }
      );

      const token = response?.data?.data?.token;

      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/dashboard");
      } else {
        setApiError("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <div className="top-bar">
        <Link to="/signin">
          <img src="/icon.svg" alt="Icon" className="top-logo" />
        </Link>
        <p className="signin-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signin-link">
            Sign Up
          </Link>
        </p>
      </div>

      <div className="form-inner">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Please enter your credentials</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
        >
          {() => (
            <Form className="signup-form">
              <div className="form-group">
                <div className="header-text">Email</div>
                <Field
                  className="input-field"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <div className="header-text">Password</div>
                <div className="password-container">
                  <Field
                    className="input-field"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              {apiError && <div className="error">{apiError}</div>}

              <button
                className="create-account"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="or-line">or sign in with</div>

        <div className="social-btns">
          <button className="google-btn" type="button">
            <img src="/g.svg" alt="Google" />
            Sign in with Google
          </button>
          <button className="facebook-btn" type="button">
            <img src="/fb.svg" alt="Facebook" />
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
