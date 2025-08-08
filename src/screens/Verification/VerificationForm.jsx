import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "../../styles/SignUpForm.css";

const VerificationForm = () => {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  // Countdown logic
  useEffect(() => {
    if (timer === 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("Required")
      .matches(/^[a-z0-9]{7}$/, "Code must be 7 lowercase letters or digits"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setApiError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://api-qa.klippify.com/api/verify-email",
        { code: values.otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Verified:", response.data);
      navigate("/create-new-password"); // or dashboard route
    } catch (error) {
      console.error("❌ API error:", error);
      setApiError(
        error?.response?.data?.message || "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-container verification">
      <div className="top-bar">
        <Link to="/signin">
          <img src="/icon.svg" alt="Icon" className="top-logo" />
        </Link>
      </div>

      <div className="form-inner">
        <h2 className="title">Verification</h2>
        <p className="subtitle">
          We’ve sent you the verification code on <strong>abc@gmail.com</strong>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="signup-form">
              <Field
                name="otp"
                type="text"
                maxLength={7}
                className="input-field otp-seven-char"
                placeholder="_______"
              />
              <ErrorMessage name="otp" component="div" className="error center-error" />

              {apiError && <div className="error center-error">{apiError}</div>}

              <button className="create-account" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Continue"}
              </button>

              {timer > 0 ? (
                <p className="resend-text">
                  Re-send code in{" "}
                  <span className="resend-timer">
                    {`0:${timer < 10 ? `0${timer}` : timer}`}
                  </span>
                </p>
              ) : (
                <p className="resend-text">
                  Didn’t receive the code?{" "}
                  <button
                    type="button"
                    className="resend-link"
                    onClick={() => setTimer(30)} // Later connect to actual resend API
                  >
                    Resend Code
                  </button>
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerificationForm;
