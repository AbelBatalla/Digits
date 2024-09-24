import React, { useState } from 'react';
import ProfileForm from '../Profiles/ProfileForm';
import Modal from './Modal';
import styles from './ProfileFormModal.module.css';

const ProfileFormModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <span>
            <span onClick={openModal} className={styles.openModalButton}>create a profile</span>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ProfileForm onSubmit={closeModal} />
            </Modal>
        </span>
    );
};

export default ProfileFormModal;