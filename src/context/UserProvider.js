import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider

} from "firebase/auth"

import {createContext, useEffect, useState} from "react";
import {auth, db} from "../firebase/firebase.config";
import {doc, setDoc, getDoc, Timestamp} from 'firebase/firestore';

export const UserContext = createContext();

const UserProvider = (props) =>{

    const [user, setUser] = useState(false);

    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth, user=> {
            console.log(user);
            if(user){
                const{email, photoURL, displayName, uid} = user;
                setUser({email, photoURL, displayName, uid});
            }else{
                setUser(null);
            }
        })
        return ()=> unsuscribe();
    }, [])

    const registerUser = async (name, surname, email, password)=>{
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', user.user.uid), {
            uid: user.user.uid,
            name: name,
            surname: surname,
            email: email,
            online: true,
            createdAt: Timestamp.fromDate(new Date())
        })
    }


    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const signOutUser = ()=> signOut(auth);

    return (
        <UserContext.Provider value={{user, setUser, registerUser, loginUser, signOutUser}}>
            { props.children }
        </UserContext.Provider>
    );

}

export default UserProvider;