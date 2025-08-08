import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import CreateNewPasswordForm from "./CreateNewPasswordForm";

const CreateNewPasswordPage = () => {
  return <HeroSection RightComponent={CreateNewPasswordForm} />;
};

export default CreateNewPasswordPage;
