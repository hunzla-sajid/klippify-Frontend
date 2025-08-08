import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUpPage from "./screens/SignUp/SignUpPage";
import SignInPage from "./screens/SignIn/SignInPage";
import VerificationPage from "./screens/Verification/VerificationPage";
import ForgotPasswordPage from "./screens/ForgotPassword/ForgotPasswordPage";
import CreateNewPasswordPage from "./screens/CreateNewPassword/CreateNewPasswordPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route path="/signin" element={<SignInPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/create-new-password" element={<CreateNewPasswordPage />} />
    </Routes>
  );
}

export default App;
