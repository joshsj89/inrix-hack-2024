import React, { useState } from "react";
import Dropdown from "./Dropdown"; // Import the Dropdown component
import "./SideBar.css";

function SideBar() {
    const [selectedItems, setSelectedItems] = useState({
        dropdown1: null, // Stores selected city
        dropdown2: null, // Stores selection for another menu
    });

    const handleSelectionChange = (event) => {
        const { name, value } = event.target;
        setSelectedItems((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Define the cities list, marking some as disabled
    const cities = [
        { value: "seattle", label: "Seattle", disabled: false }, // Clickable
        { value: "los_angeles", label: "Los Angeles", disabled: true }, // Clickable
        { value: "new_york", label: "New York", disabled: true }, // Disabled
        { value: "chicago", label: "Chicago", disabled: true }, // Clickable
        { value: "houston", label: "Houston", disabled: true }, // Disabled
    ];

    // Define another list of options for the second dropdown (example)
    const menuOptions = [
        { value: "submenu2_1", label: "Submenu 2.1", disabled: false },
        { value: "submenu2_2", label: "Submenu 2.2", disabled: false },
    ];

    return (
        <div className="sidebar">
            {/* Dropdown for Cities */}
            <Dropdown
                title="City"
                name="dropdown1"
                options={cities}
                selectedValue={selectedItems.dropdown1}
                onChange={handleSelectionChange}
            />

            {/* Dropdown for other menu options */}
            <Dropdown
                title="Menu"
                name="dropdown2"
                options={menuOptions}
                selectedValue={selectedItems.dropdown2}
                onChange={handleSelectionChange}
            />
        </div>
    );
}

export default SideBar;
