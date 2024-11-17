import React, { useState } from "react";
import "./SideBar.css";

function SideBar() {
    const [dropdown1Open, setDropdown1Open] = useState(false);
    const [dropdown2Open, setDropdown2Open] = useState(false);

    const [checkedItems, setCheckedItems] = useState({
        submenu1_1: false,
        submenu1_2: false,
        submenu2_1: false,
        submenu2_2: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    return (
        <div className="sidebar">
            <div className="menu">
                <div
                    className="menu-item"
                    onClick={() => setDropdown1Open(!dropdown1Open)}
                >
                    Menu 1
                </div>
                {dropdown1Open && (
                    <div className="dropdown">
                        <label className="dropdown-item">
                            <input
                                type="checkbox"
                                name="submenu1_1"
                                checked={checkedItems.submenu1_1}
                                onChange={handleCheckboxChange}
                            />
                            Submenu 1.1
                        </label>
                        <label className="dropdown-item">
                            <input
                                type="checkbox"
                                name="submenu1_2"
                                checked={checkedItems.submenu1_2}
                                onChange={handleCheckboxChange}
                            />
                            Submenu 1.2
                        </label>
                    </div>
                )}
            </div>
            <div className="menu">
                <div
                    className="menu-item"
                    onClick={() => setDropdown2Open(!dropdown2Open)}
                >
                    Menu 2
                </div>
                {dropdown2Open && (
                    <div className="dropdown">
                        <label className="dropdown-item">
                            <input
                                type="checkbox"
                                name="submenu2_1"
                                checked={checkedItems.submenu2_1}
                                onChange={handleCheckboxChange}
                            />
                            Submenu 2.1
                        </label>
                        <label className="dropdown-item">
                            <input
                                type="checkbox"
                                name="submenu2_2"
                                checked={checkedItems.submenu2_2}
                                onChange={handleCheckboxChange}
                            />
                            Submenu 2.2
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SideBar;
