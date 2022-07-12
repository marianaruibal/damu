// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCcBGs8uuk-sp3yb93MyDfTgNp04Aklevg",
    authDomain: "damu-2022-3bbee.firebaseapp.com",
    projectId: "damu-2022-3bbee",
    storageBucket: "damu-2022-3bbee.appspot.com",
    messagingSenderId: "360889616897",
    appId: "1:360889616897:web:c97fb188b9a26d3e5a8e00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, storage, db };