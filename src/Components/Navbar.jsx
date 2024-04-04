import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.modules.css';
import {NavLink} from "react-router-dom";
function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <header>
            <h1>Digits</h1>
            <nav ref={navRef}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/digits">Play</NavLink>
                <NavLink to="/other">Other</NavLink>
                <button className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
