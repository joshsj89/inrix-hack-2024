// src/components/Navbar.js
import { NavLink } from 'react-router-dom';
import './NavBar.css';  // Make sure to import your CSS file for styling
import logo from '../logo.svg';
function Navbar() {
    return (
        <nav>
            <img src={logo} alt="Logo" className="logo" />

            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
