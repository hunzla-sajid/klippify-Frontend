import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Step 1
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../styles/SignUpForm.css";

const ForgotPasswordForm = () => {
  const navigate = useNavigate(); // ✅ Step 2
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setErrors }) => {
    setLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api-qa.klippify.com/api/forgot-password",
        {
          email: values.email,
          redirectUrl: "http://localhost:4000", // adjust as needed
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      setSuccessMessage("✅ Password reset link sent to your email.");

      // ✅ Navigate to verification page after a short delay
      setTimeout(() => {
        navigate("/verification"); // ⬅️ update this to your actual verification route
      }, 1000);

    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong.";

      if (error.response?.data?.errors) {
        const fieldErrors = {};
        for (const err of error.response.data.errors) {
          fieldErrors[err.field] = err.message;
        }
        setErrors(fieldErrors);
      } else {
        setApiError(message);
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
      </div>

      <div className="form-inner">
        <h2 className="title">Forgot Password?</h2>
        <p className="subtitle">Don't worry, we've got you covered</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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

              {apiError && <div className="error">{apiError}</div>}
              {successMessage && (
                <div
                  style={{
                    color: "green",
                    fontSize: "14px",
                    marginTop: "6px",
                  }}
                >
                  {successMessage}
                </div>
              )}

              <button className="create-account" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Continue"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
