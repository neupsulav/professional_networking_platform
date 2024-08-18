import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(0); 
  };

  return (
    <span>
    <button onClick={handleBack} className="back-button">
      <FaArrowLeft /> Back
    </button></span>
  );
};

export default BackButton;
