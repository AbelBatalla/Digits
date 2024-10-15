// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAppCheck, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const apiKey = process.env.REACT_APP_API_KEY;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;
const recaptchaKey = process.env.REACT_APP_RECAPTCHA_V3_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "numericalcognition.net",
    projectId: "digits-542ea",
    storageBucket: "digits-542ea.appspot.com",
    messagingSenderId: "41380800132",
    appId: appId,
    measurementId: "G-4V10FY4HXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaKey),
    isTokenAutoRefreshEnabled: true
});
