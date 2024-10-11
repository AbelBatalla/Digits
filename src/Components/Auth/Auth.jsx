import { auth, googleProvider } from "../../config/firebase";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
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
            prompt: "select_account", // This forces the account chooser to show up every time
        });
        await signInWithPopup(auth, provider);
        console.log("Here3");
    } catch (err) {
        console.error(err);
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
