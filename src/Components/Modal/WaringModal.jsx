import React from 'react';
import styles from './Modal.module.css';

const WarningModal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    );
};

export default WarningModal;