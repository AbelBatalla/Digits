import React from 'react';
import styles from './Modal.module.css';
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.closeButton} onClick={onClose}> <FaTimes/></div>
                {children}
            </div>
        </div>
    );
};

export default Modal;