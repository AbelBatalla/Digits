import { auth, googleProvider } from "../../config/firebase";
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
    } catch (err) {
        console.error(err);
    }
};

export const loginEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }
};

export const loginGoogle = async () => {
    try {
        const provider = googleProvider;
        provider.setCustomParameters({
            prompt: "select_account", // This forces the account chooser to show up every time
        });
        await signInWithPopup(auth, provider);
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
