import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase'; // Make sure to import 'db'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);

            if (user) {
                console.log("User logged in:", user);
                console.log("User logged in, auth:", auth);
                const userDocRef = doc(db, "Users", user.uid);
                const userDocSnapshot = await getDoc(userDocRef).then();
                if (!userDocSnapshot.exists()) {
                    console.log("Creating user document...", user.providerData[0].providerId);
                    await createUserDoc(user, user.providerData[0].providerId);
                }
            }
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userLoggedIn: !!currentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

const createUserDoc = async (user, provider) => {
    try {
        await setDoc(doc(db, "Users", user.uid), {
            UserID: user.uid,
            email: user.email,
            acceptedPolicy: provider !== "google.com"
        });
    } catch (error) {
        console.error("Error creating user document:", error);
    }
};
