import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/SignUpForm.css"; // Shared styles

const CreateNewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // TODO: Replace with dynamic code from previous step (e.g., localStorage or context)
  const verificationCode = "1fae293";

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setApiError("");

      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "https://api-qa.klippify.com/api/reset-password",
          {
            code: verificationCode,
            newPassword: values.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Password reset successful", response.data);
        resetForm();
        navigate("/signin");
      } catch (error) {
        console.error("❌ Reset error:", error);
        setApiError(
          error?.response?.data?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="signup-form-container create-new-password">
      <div className="top-bar">
        <Link to="/signin">
          <img src="/icon.svg" alt="Icon" className="top-logo" />
        </Link>
      </div>

      <div className="form-inner">
        <h2 className="title">Create New Password</h2>
        <p className="subtitle">Secure your account with a new password</p>

        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <div className="header-text">Password</div>
            <div className="password-container">
              <input
                className="input-field"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your new password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error">{formik.errors.confirmPassword}</div>
              )}
          </div>

          {apiError && <div className="error center-error">{apiError}</div>}

          <button className="create-account" type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPasswordForm;
