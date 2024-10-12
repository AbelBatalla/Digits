import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const AcceptPrivacyPolicy = () => {
    const uid = sessionStorage.getItem("uid");

    const handleAccept = async () => {
        try {
            // Update Firestore document to mark privacy policy as accepted
            const userRef = doc(db, 'Users', uid);
            await updateDoc(userRef, { acceptedPolicy: true});
            // Redirect user to the main app or home page after acceptance
            window.location.href = "/";
        } catch (error) {
            console.error("Error updating privacy policy acceptance:", error);
        }
    };

    return (
        <div>
            <h1>Privacy Policy</h1>
            <p>Display your privacy policy here</p>
            <button onClick={handleAccept}>Accept Privacy Policy</button>
        </div>
    );
};

export default AcceptPrivacyPolicy;
