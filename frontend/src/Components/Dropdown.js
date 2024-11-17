import React, { useState } from "react";
import "./Dropdown.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Dropdown({ title, options, selectedValue, onChange, name }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionChange = (event) => {
        const newValue = event.target.value;
        onChange(name, newValue); // Pass both name and new value to the parent component
    };

    return (
        <div>
            <div className="menu-header" onClick={() => setIsOpen(!isOpen)}>
                <div>{title}</div> {/* Menu Header */}
                <div className="arrow">{isOpen ? <ExpandLessIcon style={{fontSize: 'medium'}}/> : <ExpandMoreIcon style={{fontSize: 'medium'}}/>}</div> {/* Arrow */}
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
