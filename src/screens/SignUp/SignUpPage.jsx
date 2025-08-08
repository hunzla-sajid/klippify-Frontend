import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return <HeroSection RightComponent={SignUpForm} />;
};

export default SignUpPage;
