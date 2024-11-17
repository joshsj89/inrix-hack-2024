import React, { useState } from "react";

function Dropdown({ title, options, selectedValue, onChange, name }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionChange = (event) => {
        const newValue = event.target.value;
        onChange(name, newValue); // Pass both name and new value to the parent component
    };

    return (
        <div className="menu">
            <div className="menu-header" onClick={() => setIsOpen(!isOpen)}>
                <div>{title}</div> {/* Menu Header */}
                <div className="arrow">{isOpen ? "▲" : "▼"}</div> {/* Arrow */}
            </div>
            {isOpen && (
                <div className="dropdown">
                    {options.map((option) => (
                        <label key={option.value} className="dropdown-item">
                            <input
                                type="radio"
                                value={option.value}
                                checked={selectedValue === option.value}
                                onChange={handleOptionChange}
                                disabled={option.disabled} // Disable based on 'disabled' property
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
