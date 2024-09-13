import React, {useState} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import { useAuth } from "../contexts/authContext";
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser, userLoggedIn } = useAuth();

    return (
        <header className={styles.header}>
            <h1 className={styles.h1}>Digits</h1>
            <nav className= {[
                styles.nav,
                menuOpen ? styles.open : '',
            ].join(' ')}>
                <NavLink className={styles.a} to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink className={styles.a} to="/digits" onClick={() => setMenuOpen(false)}>Play</NavLink>
                <NavLink className={styles.a} to="/other" onClick={() => setMenuOpen(false)}>Other</NavLink>
                <div className={styles.user}>
                    {userLoggedIn ? (
                        <p>{currentUser.email}</p>
                    ) : (
                        <p>Not logged in</p>
                    )}
                </div>
                <button className={[styles.navBtn, styles.navCloseBtn].join(' ')}
                        onClick={() => setMenuOpen(!menuOpen)}>
                    <FaTimes />
                </button>
            </nav>
            <button className={styles.navBtn}
                    onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
