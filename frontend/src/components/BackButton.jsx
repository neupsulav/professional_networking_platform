import React from "react";
// import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ selectedPath, setSelectedPath }) => {
  // const navigate = useNavigate();

  // const handleBack = () => {
  //   // navigate(5);

  // };

  return (
    <span>
      <button
        onClick={() => {
          // setSelectedPath(5);
        }}
        className="back-button"
      >
        <FaArrowLeft /> Back
      </button>
    </span>
  );
};

export default BackButton;
