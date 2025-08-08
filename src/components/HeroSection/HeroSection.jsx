// src/components/HeroSection/HeroSection.jsx
import React from "react";
import "./HeroSection.css";
import LeftContent from "../LeftContent/LeftContent";

const HeroSection = ({ RightComponent }) => {
  return (
    <div className="hero-container">
      <LeftContent />
      {RightComponent && <RightComponent />}
    </div>
  );
};

export default HeroSection;
