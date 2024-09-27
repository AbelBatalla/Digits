import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../../contexts/profileContext/profileContext';
import styles from './ProfileSelector.module.css';
import { Link } from 'react-router-dom';

const ProfileSelectScreen = ({ currentProfile }) => {
    const { profiles } = useProfile();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button onClick={toggleDropdown} className={styles.dropdownButton}>
                Select Profile
            </button>
            {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                    <ul>
                        {profiles.map((profile, index) => (
                            <li key={index}>
                                <div
                                    className={styles.prof}
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <Link  className={styles.iconLink} to={`/profile/${profile.Name}`} >
                                        {profile.Name}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileSelectScreen;