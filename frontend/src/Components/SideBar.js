import React, { useState } from "react";
import "./SideBar.css";
import Dropdown from "./Dropdown";

function SideBar() {
    const [dropdown1Open, setDropdown1Open] = useState(false);
    const [dropdown2Open, setDropdown2Open] = useState(false);

    const [selectedItems, setSelectedItems] = useState({
        dropdown1: "seattle", // Default value for the first dropdown
        dropdown2: "submenu2_1", // Default value for the second dropdown
    });

    const handleSelectionChange = (name, value) => {
        setSelectedItems((prevState) => ({
            ...prevState,
            [name]: value, // Update the selected value for the corresponding dropdown
        }));
    };

    // Define the cities list, marking some as disabled
    const cities = [
        { value: "seattle", label: "Seattle", disabled: false },
        { value: "los_angeles", label: "Los Angeles", disabled: true },
        { value: "new_york", label: "New York", disabled: true },
        { value: "chicago", label: "Chicago", disabled: true },
        { value: "houston", label: "Houston", disabled: true },
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
