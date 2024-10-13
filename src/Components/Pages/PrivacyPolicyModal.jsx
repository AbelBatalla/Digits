import React, {useState} from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from './PrivacyPolicyModal.module.css';
import {Link} from "react-router-dom";

const PrivacyPolicyModal = ({ user, setShowModal }) => {
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAccept = async () => {
        if (!acceptPolicy) {
            setErrorMessage('You must be 18 or older and accept the Privacy Policy to register.');
            return;
        }
        try {
            // Update Firestore document to indicate that the user has accepted the privacy policy
            await updateDoc(doc(db, "Users", user.uid), {
                acceptedPolicy: true,
            });
            setShowModal(false);  // Close the modal after acceptance
        } catch (error) {
            console.log("Error accepting privacy policy:", error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Privacy Policy and Age Confirmation</h2>
                <p>Please accept our privacy policy and confirm you are 18 or older before proceeding.</p>
                <div className={styles.privacyContainer}>
                    <input
                        type="checkbox"
                        id="acceptPolicy"
                        checked={acceptPolicy}
                        onChange={(e) => setAcceptPolicy(e.target.checked)}
                        className={styles.checkbox}
                    />
                    <label htmlFor="acceptPolicy">
                        I am 18 or older and accept the <Link to="/privacy-policy" className={styles.loginLink}>Privacy Policy</Link>.
                    </label>
                </div>
                {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}

                <button className={styles.modalButton} onClick={handleAccept}>Accept Privacy Policy</button>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;
