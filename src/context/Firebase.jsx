import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDocs, addDoc, getDocs, doc, getDoc,where,query } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getStorage } from "firebase/storage";


const FirebaseContext = createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFKEBM27Qo9L7TrXlH-fSKTbUXElUFmrU",
    authDomain: "books-b45a0.firebaseapp.com",
    projectId: "books-b45a0",
    storageBucket: "books-b45a0.firebasestorage.app",
    messagingSenderId: "227480637175",
    appId: "1:227480637175:web:b6da26810570693e090df2",
    measurementId: "G-GWFJ6SX8X9"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider(firebaseApp);



// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);
auth.languageCode = 'it';
export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);




    const SignupUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password)

    const SigninUserWithEmailAndPassword = (email, password) =>
        signInWithEmailAndPassword(firebaseAuth, email, password)


    const SigninWithGoogle = () =>
        signInWithPopup(firebaseAuth, googleProvider)

    console.log(user)

    const handleCreateNewListing = async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`)
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            imageUrl: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })

    }

    const listAllBooks = () => { return getDocs(collection(firestore, 'book')) }

    const getBookById = async (id) => {
        const docRef = doc(firestore, 'books', id)
        const result = await getDoc(docRef);
        return result;
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    const placeOrder = async (bookId,qty) => {
        const collectionRef = collection(firestore, 'books', bookId, "order")
        const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty,
        })
        return result;

    }

    const fetchMyBooks =async (userId) => {
        
        const collectionRef= collection(firestore, 'books' );
        const q= query(collectionRef,where("userID",'==',userId))

        const result= await getDocs(q);
        return result;
    }

const getOrders = async(bookId)=>{
    const collectionRef = collection(firestore, 'books', bookId, "orders")
    const result = await getDocs(collectionRef)
    return result;

}

    const isloggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{ SignupUserWithEmailAndPassword, SigninUserWithEmailAndPassword, SigninWithGoogle, onAuthStateChanged, isloggedIn, listAllBooks, handleCreateNewListing, storage, getImageURL, getBookById, placeOrder, fetchMyBooks,user,getOrders }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { storage };