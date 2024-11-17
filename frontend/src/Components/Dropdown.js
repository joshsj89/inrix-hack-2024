import React, { useState } from "react";

function Dropdown({ title, options, selectedValue, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="menu">
            <div className="menu-header" onClick={() => { setIsOpen(!isOpen); console.log("Menu clicked!"); }}>
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
                                onChange={onChange}
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