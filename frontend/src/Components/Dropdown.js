import React, { useState } from "react";

function Dropdown({ title, name, options, selectedValue, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="menu">
            <div className="menu-item" onClick={() => setIsOpen(!isOpen)}>
                {title}
            </div>
            {isOpen && (
                <div className="dropdown">
                    {options.map((option) => (
                        <label key={option.value} className="dropdown-item">
                            <input
                                type="radio"
                                name={name}
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