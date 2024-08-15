import React, { useState } from "react";

const CustomMultiselect = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isOptionSelected = (option) => selectedOptions.includes(option);

  return (
    <div className="custom-multiselect">
      <div className="multiselect-input" onClick={toggleDropdown}>
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select options..."}
        <span className="multiselect-arrow">&#9662;</span>
      </div>
      {isOpen && (
        <div className="multiselect-dropdown">
          {options.map((option) => (
            <div
              key={option}
              className={`multiselect-option ${
                isOptionSelected(option) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMultiselect;
