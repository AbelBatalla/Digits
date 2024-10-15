// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAppCheck, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBt4VRbohs2OVISGkOvd5lVoq0xKRofEww",
    authDomain: "numericalcognition.net",
    projectId: "digits-542ea",
    storageBucket: "digits-542ea.appspot.com",
    messagingSenderId: "41380800132",
    appId: "1:41380800132:web:71dc1196e406efb49fc4d1",
    measurementId: "G-4V10FY4HXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LeIRGAqAAAAAMQ7nKlmP7Vzzy282dHdtHIaOjUK'),
    isTokenAutoRefreshEnabled: true
});