import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDpUU-jjXb1aymz6OXI1mx58fqUprZ4VEk",
    authDomain: "shoping-27d20.firebaseapp.com",
    projectId: "shoping-27d20",
    storageBucket: "shoping-27d20.appspot.com",
    messagingSenderId: "469323744965",
    appId: "1:469323744965:web:7265162268ac1029fa92ac",
    measurementId: "G-MW2QZWYKL0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();