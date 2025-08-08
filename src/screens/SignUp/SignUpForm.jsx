import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/SignUpForm.css";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "creator",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Full Name must be at least 3 characters")
        .required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      role: Yup.string().required("Role is required"),
    }),
    validateOnMount: true,

    onSubmit: async (values) => {
      setLoading(true);
      setApiError(null);

      try {
        const response = await axios.post(
          "https://api-qa.klippify.com/api/signup",
          {
            name: values.fullName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            role: values.role,
          }
        );

        alert("Account created successfully!");

        navigate("/verification", {
          state: { email: values.email },
        });

        formik.resetForm();
      } catch (error) {
        if (error.response?.data?.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="signup-form-container">
      <div className="top-bar">
        <Link to="/signin">
          <img src="/icon.svg" alt="Icon" className="top-logo" />
        </Link>
        <p className="signin-text">
          Already have an account?{" "}
          <Link to="/signin" className="signin-link">
            Sign In
          </Link>
        </p>
      </div>

      <div className="form-inner">
        <h2 className="title">Get Started</h2>
        <p className="subtitle">How are you planning to use Klippify?</p>

        <div className="role-toggle-container">
          <button
            type="button"
            className={`role-btn ${formik.values.role === "creator" ? "active" : ""}`}
            onClick={() => formik.setFieldValue("role", "creator")}
          >
            🧑‍🎨 Creator
          </button>
          <button
            type="button"
            className={`role-btn ${formik.values.role === "brand" ? "active" : ""}`}
            onClick={() => formik.setFieldValue("role", "brand")}
          >
            🏷️ Brand
          </button>
        </div>

        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <div className="header-text">Full Name</div>
            <input
              className="input-field"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              {...formik.getFieldProps("fullName")}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="error">{formik.errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <div className="header-text">Email</div>
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <div className="header-text">Password</div>
            <div className="password-container">
              <input
                className="input-field"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <div className="header-text">Confirm Password</div>
            <div className="password-container">
              <input
                className="input-field"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                {...formik.getFieldProps("confirmPassword")}
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="error">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button className="create-account" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {apiError && <div className="error">{apiError}</div>}
        </form>

        <div className="or-line">or sign up with</div>

        <div className="social-btns">
          <button className="google-btn" type="button">
            <img src="/g.svg" alt="Google" />
            Sign up with Google
          </button>
          <button className="facebook-btn" type="button">
            <img src="/fb.svg" alt="Facebook" />
            Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
