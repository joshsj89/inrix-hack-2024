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
            <div style={{display: 'flex', flexDirection: 'column', gap: 17, marginBottom: 20}}>
                <span style={{fontSize: 20, marginVertical: 20}}>Marker Key</span>
                <div className="statusKey">
                    <div style={{ backgroundColor: '#FFDB58' }} className="statusColor"></div>
                    <span>1 piece of trash</span>
                </div>
                <div className="statusKey">
                    <div style={{backgroundColor: 'orange'}} className="statusColor"></div>
                    <span>2 to 3 pieces of trash</span>
                </div>
                <div className="statusKey">
                    <div style={{backgroundColor: 'red'}} className="statusColor"></div>
                    <span>4+ pieces of trash</span>
                </div>
            </div>
            {/* Dropdown for Cities */}
            <Dropdown
                title="City"
                options={cities}
                selectedValue={selectedItems.dropdown1}
                onChange={handleSelectionChange}
                name="dropdown1"
            />

            {/* Uncomment and modify the second dropdown as necessary */}
            {/* <Dropdown
                title="Menu"
                name="dropdown2"
                options={menuOptions}
                selectedValue={selectedItems.dropdown2}
                onChange={handleSelectionChange}
                isOpen={dropdown2Open}
                setIsOpen={setDropdown2Open}
                disabled={!dropdown2Open} // Disable the dropdown when not open
            /> */}
        </div>
    );
}

export default SideBar;
