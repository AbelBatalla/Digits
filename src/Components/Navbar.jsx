import React, {useState} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
import {NavLink} from "react-router-dom";
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <h1>Digits</h1>
            <nav className={menuOpen ? "open" : ""}>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink to="/digits" onClick={() => setMenuOpen(false)}>Play</NavLink>
                <NavLink to="/other" onClick={() => setMenuOpen(false)}>Other</NavLink>
                <button className="nav-btn nav-close-btn"
                        onClick={() => setMenuOpen(!menuOpen)}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn"
                    onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
