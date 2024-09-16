import React, {useState} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/authContext";
import UserPopUp from "./UserPopUp";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser, userLoggedIn, logout } = useAuth();
    const [hover, setHover] = useState(false);

    function removeHover() {
        setHover(false);
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.h1}>Digits</h1>
            <nav className= {[
                styles.nav,
                menuOpen ? styles.open : '',
            ].join(' ')}>
                <NavLink className={({ isActive, isPending }) =>
                    `${styles.a} ${isActive || isPending ? styles.active : ''}`
                } to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink className={({ isActive, isPending }) =>
                    `${styles.a} ${isActive || isPending ? styles.active : ''}`
                } to="/digits" onClick={() => setMenuOpen(false)}>Play</NavLink>
                {userLoggedIn && (
                    <NavLink className={({ isActive, isPending }) =>
                        `${styles.a} ${isActive || isPending ? styles.active : ''}`
                    } to="/stats" onClick={() => setMenuOpen(false)}>Stats</NavLink>
                )}
                <NavLink className={({ isActive, isPending }) =>
                    `${styles.a} ${isActive || isPending ? styles.active : ''}`
                } to="/other" onClick={() => setMenuOpen(false)}>Other</NavLink>
                {userLoggedIn ? (
                    <div
                        className={styles.user}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <p>{currentUser.email}</p>
                        {hover && (
                            <div>
                                <UserPopUp onClickEffect={removeHover}/>
                            </div>
                        )}
                    </div>
                    ) : (
                    <NavLink className={({ isActive, isPending }) =>
                        `${styles.a} ${isActive || isPending ? styles.active : ''}`
                    } to="/login" onClick={() => setMenuOpen(false)}>Log In</NavLink>
                )}


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
