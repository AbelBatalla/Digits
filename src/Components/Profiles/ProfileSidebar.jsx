import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext/profileContext';
import styles from './ProfileSidebar.module.css';
import {FaPlus} from "react-icons/fa";
import ProfileForm from "./ProfileForm";
import Modal from "../Modal/Modal";


const ProfileSidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { profiles } = useProfile();
    const { profileName } = useParams();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className={styles.sidebar}>
            <ul>
                {profiles.map((profile, index) => (
                    <li key={index}
                        className={profileName === profile.Name ? styles.selectedProfile : ''}
                    >
                        <Link to={`/profile/${profile.Name}`} className={styles.profileLink}>
                            {profile.Name}
                        </Link>
                    </li>
                ))}
                <li>
                    <div
                        className={styles.addProfileProf}
                        onClick={openModal}
                    >
                        <div className={styles.addProfileIconLink}>
                            <FaPlus className={styles.addProfileIcon}/>
                        </div>
                    </div>
                </li>
            </ul>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ProfileForm onSubmit={closeModal} />
            </Modal>
        </div>
    );
};

export default ProfileSidebar;