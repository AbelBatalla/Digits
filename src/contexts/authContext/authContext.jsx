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
            console.log("Here1");
            setLoading(true);

            if (user) {
                console.log("starting search for user document...");
                const userDocRef = doc(db, "Users", user.uid);
                console.log("obtaining user document...", userDocRef);
                const userDocSnapshot = await getDoc(userDocRef);
                console.log("user document obtained, checking existance.", userDocSnapshot);
                if (!userDocSnapshot.exists()) {
                    console.log("Creating user document...");
                    await createUserDoc(user);
                }
                console.log("User check completed.");
            }
            console.log("Here2");
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

const createUserDoc = async (user) => {
    try {
        await setDoc(doc(db, "Users", user.uid), {
            UserID: user.uid,
            email: user.email
        });
    } catch (error) {
        console.error("Error creating user document:", error);
    }
};
