import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return <HeroSection RightComponent={SignInForm} />;
};

export default SignInPage;
