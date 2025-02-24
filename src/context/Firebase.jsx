import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const FirebaseContext = createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFha_SA-yuKyVBauw_eWRtyaKeugeCeag",
    authDomain: "bookifi-be277.firebaseapp.com",
    projectId: "bookifi-be277",
    storageBucket: "bookifi-be277.firebasestorage.app",
    messagingSenderId: "455681523717",
    appId: "1:455681523717:web:7890694ec78a897b8d5c6c"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider(firebaseApp);



// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);
auth.languageCode = 'it';
export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
          if(user)  setUser(user);   
          else setUser(null);
        });
    }, []);


 

    const SignupUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password)

    const SigninUserWithEmailAndPassword = (email, password) =>
        signInWithEmailAndPassword(firebaseAuth, email, password)


    const SigninWithGoogle = () =>
        signInWithPopup(firebaseAuth, googleProvider)

const isloggedIn = user? true:false;

    return (
        <FirebaseContext.Provider value={{ SignupUserWithEmailAndPassword, SigninUserWithEmailAndPassword, SigninWithGoogle, onAuthStateChanged, isloggedIn }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);