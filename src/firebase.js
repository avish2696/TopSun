// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXEVN6WItR5s0ESia1U6nV8iCwrv4Z9hw",
    authDomain: "topsun-ecommerce.firebaseapp.com",
    projectId: "topsun-ecommerce",
    storageBucket: "topsun-ecommerce.firebasestorage.app",
    messagingSenderId: "355265975048",
    appId: "1:355265975048:web:fe76fd94801b8c537d12bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Export Recaptcha and Phone Auth for OTP
export { RecaptchaVerifier, signInWithPhoneNumber };

export default app;