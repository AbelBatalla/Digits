import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../../contexts/profileContext/profileContext';
import styles from './ProfileSelector.module.css';
import {FaAngleDown, FaArrowDown, FaBars, FaPlus, FaUser} from "react-icons/fa";
import { Link } from 'react-router-dom';
import ProfileFormModal from "../Modal/ProfileFormModal";
import Modal from "../Modal/Modal";
import ProfileForm from "./ProfileForm";

const ProfileSelector = () => {
    const { profiles, activeProfile, setActiveProfile } = useProfile();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsDropdownOpen(false);
    }

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

    const filteredProfiles = activeProfile
        ? profiles.filter(profile => profile.Name !== activeProfile.Name)
        : [];

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button onClick={toggleDropdown} className={styles.dropdownButton}>
                <div className={styles.buttonIconLink}>
                    <FaUser className={styles.buttonIcon} />
                </div>
                <strong className={styles.activeProfButton}>{activeProfile ? activeProfile.Name : "Select Profile"} </strong>
                {activeProfile && isDropdownOpen ? (
                    <Link className={styles.buttonIconLink} to={`/profile/${activeProfile.Name}`}>
                        <FaBars className={styles.buttonIconBars} />
                    </Link>
                ) : (
                    <div className={styles.buttonIconLink}>
                        <FaAngleDown className={styles.buttonIconAngle} />
                    </div>
                )}
            </button>
            {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                    <ul>
                        {filteredProfiles.map((profile, index) => (
                            <li key={index}>
                                <div
                                    className={styles.prof}
                                    onClick={() => {
                                        setActiveProfile(profile);
                                        setIsDropdownOpen(false);
                                    }}
                                    style={{ fontWeight: activeProfile === profile ? 'bold' : 'normal' }}
                                >
                                    {profile.Name}
                                    <Link className={styles.iconLink} to={`/profile/${profile.Name}`}>
                                        <FaBars className={styles.icon} />
                                    </Link>
                                </div>
                            </li>
                        ))}
                        <li>
                            <div
                                className={styles.addProfileProf}
                                onClick={openModal}
                            >
                                <div className={styles.addProfileIconLink}>
                                    <FaPlus className={styles.addProfileIcon} />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ProfileForm onSubmit={closeModal} />
            </Modal>
        </div>
    );
};

export default ProfileSelector;