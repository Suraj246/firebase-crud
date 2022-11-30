import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
//for authentication
import { getAuth, GoogleAuthProvider, } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_fCHr5O08rAXETZl85FeUdVC8uh9XXAI",
    authDomain: "fir-crud-f2a2f.firebaseapp.com",
    projectId: "fir-crud-f2a2f",
    storageBucket: "fir-crud-f2a2f.appspot.com",
    messagingSenderId: "487921822869",
    appId: "1:487921822869:web:03f8cae70b471ae8413f9c",
    measurementId: "G-P7S93LYKP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();