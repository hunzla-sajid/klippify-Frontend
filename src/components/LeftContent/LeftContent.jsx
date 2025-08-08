// src/components/LeftContent/LeftContent.jsx
import React from "react";
import "./LeftContent.css";

const LeftContent = () => {
  return (
    <div className="left-content">
      <img src="/klippify.svg" alt="Klippify Logo" className="left-logo" />
      <div className="left-texts">
        <h2 className="gradient-text">
          Transform Your Product Strategy With <br />
          Data-Driven Decisions And <br /> Streamlined Analysis
        </h2>
        <p className="subtext">
          Transform Your Product Strategy With Data-Driven <br />
          Decisions And Streamlined Analysis
        </p>
      </div>
    </div>
  );
};

export default LeftContent;
