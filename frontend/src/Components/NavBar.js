// src/components/Navbar.js
import { NavLink } from 'react-router-dom';
import './NavBar.css';  // Make sure to import your CSS file for styling
import logo from '../logo.png';
function Navbar() {
    return (
        <nav>
            <div className='logoAndTitle' onClick={() => window.location.href = "/"}>
                <img src={logo} alt="Logo" className="logo" />
                <div className="appName">Littercator</div>
            </div>

            {/* <div className="links">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
                    </li>
                </ul>
            </div> */}
        </nav>
    );
}

export default Navbar;