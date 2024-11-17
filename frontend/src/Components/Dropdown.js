import React, { useState } from "react";
import "./Dropdown.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Dropdown({ title, options, selectedValue, onChange, name }) {
    const [isOpen, setIsOpen] = useState(true); // Default to true for auto-open

    const handleOptionSelect = (optionValue, isDisabled) => {
        if (isDisabled) return; // Prevent selection of disabled options

        if (selectedValue !== optionValue) { // Only update if it's a different option
            onChange(name, optionValue); // Pass both name and selected value to the parent
        }
    };

    const selectedOption = options.find(option => option.value === selectedValue);

    return (
        <div className="dropdown-container">
            {/* Remove click toggle or make it conditional */}
            <div className="menu-header" onClick={() => setIsOpen(!isOpen)}>
                <div>{title}</div> {/* Menu Header */}
                <div className="selected-value">
                    {selectedOption ? selectedOption.label : "Select an option"} {/* Show selected option */}
                </div>
                <div className="arrow">
                    {isOpen ? <ExpandLessIcon style={{ fontSize: 'medium' }} /> : <ExpandMoreIcon style={{ fontSize: 'medium' }} />}
                </div>
            </div>
            {isOpen && (
                <div className="dropdown">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="dropdown-item"
                            onClick={() => handleOptionSelect(option.value, option.disabled)} // Select an option when clicked
                            style={{
                                cursor: option.disabled ? 'not-allowed' : 'pointer',
                                backgroundColor: selectedValue === option.value ? '#BECDB1' : '#f0f0f0', // Default background for unselected
                            }}
                        >
                            <div className={option.disabled ? 'disabled' : ''}>
                                {option.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;