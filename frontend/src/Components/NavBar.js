// src/components/Navbar.js
import { NavLink } from 'react-router-dom';
import './NavBar.css';  // Make sure to import your CSS file for styling
import logo from '../logo.png';
function Navbar() {
    return (
        <nav>
            <div className='logoAndTitle' onClick={() => window.location.href = "/"}>
                <img src={logo} alt="Logo" className="logo" />
                <div className="title">App Name</div>
            </div>

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