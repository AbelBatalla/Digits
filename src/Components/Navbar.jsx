import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.modules.css';
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
                <a href="">Home</a>
                <a href="">Play</a>
                <a href="">Other</a>
                <button className="navBtn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="navBtn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
