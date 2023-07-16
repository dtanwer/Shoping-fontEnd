import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth,googleProvider} from '../config/firebase'
export const signInWithGoogle =() => signInWithPopup(auth, googleProvider);
export const signInWithEmailPassword = (email,password) => signInWithEmailAndPassword(auth, email, password)