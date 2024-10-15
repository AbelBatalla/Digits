// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAppCheck, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "numericalcognition.net",
    projectId: "digits-542ea",
    storageBucket: "digits-542ea.appspot.com",
    messagingSenderId: "41380800132",
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-4V10FY4HXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.RECAPTCHA_V3_KEY),
    isTokenAutoRefreshEnabled: true
});
