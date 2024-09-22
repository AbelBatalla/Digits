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
        const result = await createUserWithEmailAndPassword(auth, email, password);
        createUserDoc(result.user);
    } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
            console.error("This email is already in use.");
        } else if (err.code === 'auth/invalid-email') {
            console.error("Invalid email format.");
        } else if (err.code === 'auth/weak-password') {
            console.error("The password is too weak.");
        } else {
            console.error("Error during sign-up:", err.message);
        }
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

        const result = await signInWithPopup(auth, provider);
        const { isNewUser } = result._tokenResponse;
        if (isNewUser) {
            await createUserDoc(result.user);
        }

    } catch (err) {
        console.error(err);
    }
};

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
