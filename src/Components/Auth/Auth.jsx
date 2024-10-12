import { auth, googleProvider } from "../../config/firebase";
import { db } from "../../config/firebase";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
} from "firebase/auth";

export const signUpEmail = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return 0;
    } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
            return 1;
        } else if (err.code === 'auth/invalid-email') {
            return 2;
        } else if (err.code === 'auth/weak-password') {
            return 3;
        } else {
            return 4;
        }
    }
};

export const loginEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return 0;
    } catch (err) {
        return err.code;
    }
};

export const loginGoogle = async () => {
    try {
        const provider = googleProvider;
        provider.setCustomParameters({
            prompt: "select_account",
        });
        await signInWithPopup(auth, provider);
        /*
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const isNewUser = result._tokenResponse.isNewUser;
        if (isNewUser) {
            // New user detected, redirect them to accept the privacy policy
            //redirectToPrivacyPolicy(user.uid);
        } else {
            // Check if existing user has accepted the privacy policy
            const userRef = doc(db, 'Users', user.uid);
            const userSnap = await getDoc(userRef);
            const acceptedPolicy = userSnap.data().acceptedPolicy;
            if (userSnap.exists() && acceptedPolicy) {
            } else {
                //redirectToPrivacyPolicy(user.uid);
            }
        }*/
        return 0;
    } catch (err) {
        return err.code;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
    }
};

export const passwordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (err) {
        console.error(err);
    }
};

const redirectToPrivacyPolicy = (uid) => {
    // Store the user ID temporarily (in session storage, for example)
    sessionStorage.setItem("uid", uid);
    // Redirect to the privacy policy acceptance page
    window.location.href = "/accept-privacy-policy";
};

/*
export const sendEmailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}`,
        });
    } catch (err) {
        console.error(err);
    }
};
*/
