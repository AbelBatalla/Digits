import React from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from './PrivacyPolicyModal.module.css';
import {Link} from "react-router-dom";

const PrivacyPolicyModal = ({ user, setShowModal }) => {

    const handleAccept = async () => {
        try {
            // Update Firestore document to indicate that the user has accepted the privacy policy
            await updateDoc(doc(db, "Users", user.uid), {
                acceptedPolicy: true,
            });
            setShowModal(false);  // Close the modal after acceptance
        } catch (error) {
            console.error("Error accepting privacy policy:", error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Privacy Policy</h2>
                <p>Please accept our privacy policy before proceeding.</p>
                I am 18 or over and accept the <Link to="/privacy-policy" className={styles.loginLink}>Privacy Policy</Link>.
                <button className={styles.modalButton} onClick={handleAccept}>Accept Privacy Policy</button>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;
