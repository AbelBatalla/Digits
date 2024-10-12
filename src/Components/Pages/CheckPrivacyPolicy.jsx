import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";  // Your Firebase config
import PrivacyPolicyModal from './PrivacyPolicyModal';  // Pop-up component

const CheckPrivacyPolicy = () => {
    const auth = getAuth();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log("Checking privacy policy...");
            if (user) {
                console.log("Checking privacy policy, USER LOGGED IN");
                setUser(user);

                // Check Firestore to see if user has accepted privacy policy
                const userDoc = await getDoc(doc(db, "Users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("User data:", userData);
                    if (!userData.acceptedPolicy) {
                        setShowModal(true);
                    }
                } else {
                    console.log("No user document found!");
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {showModal && <PrivacyPolicyModal user={user} setShowModal={setShowModal} />}
        </div>
    );
};

export default CheckPrivacyPolicy;