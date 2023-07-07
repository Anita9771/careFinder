// import { createContext, useEffect, useState, useContext } from 'react';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, collection, doc, getFirestore } from 'firebase/firestore';

interface UserAuthContextType {
  signUp: (email: string, password: string, displayName: string) => Promise<any>,
  logIn: (email: string, password: string) => Promise<any>,
  logOut: () => Promise<void>,
  googleSignIn: () => Promise<any>,
  resetPassword: (email: string) => Promise<void>,
  user: any
}

// const usersCollectionRef = collection(db as Firestore, 'users');

const userAuthContext = createContext<UserAuthContextType>({
  signUp: () => Promise.resolve(),
  logIn: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
  googleSignIn: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  user: null
});

export function UserAuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>("");

  // function signUp(email: string, password: string) {
  //   db.collection('users').doc(user.uid).set({
  //     email: user.email,
  //     displayName: user.displayName,
  //   })
  //   return createUserWithEmailAndPassword(auth, email, password);

  // }

  // function signUp(email: string, password: string) {
  //   // db.collection('users').doc(user.uid).set({
  //   //   email: user.email,
  //   //   displayName: user.displayName,
  //   // })
  //   // return createUserWithEmailAndPassword(auth, email, password);

  //   auth.createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Signed in 
  //       return db.collection('users').doc(user.uid).set({
  //           email: user.email,
  //           displayName: user.displayName,
  //         })
  //       // ...
  //     }
  //     )

  // }

  // function signUp(email: string, password: string) {
  //   return createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       if (user) {
  //         return db.collection('users').doc(user.uid).set({
  //           email: user.email,
  //           name: user.displayName, // Assuming user.displayName is available
  //         });
  //       }
  //       return Promise.reject(new Error('Failed to create user'));
  //     })
  //     .catch((error) => {
  //       // Handle any errors during the sign-up process
  //       console.error('Sign-up error:', error);
  //       alert(error);
  //       // You can throw an error or handle it in any way appropriate for your use case
  //       throw error;
  //     });
  // }

  async function signUp(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      const db = getFirestore();
      const userCollectionRef = collection(db, 'users');
      const userDocRef = doc(userCollectionRef, user.uid);

      const userData = {
        email: user.email,
        name: user.displayName,
        // Additional user data
      };

      await setDoc(userDocRef, userData);
    }
  } catch (error) {
    // Handle sign-up errors
    console.error('Sign-up error:', error);
    throw error;
  }
}

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  // sendPasswordResetEmail(auth, email)
  // .then(() => {
  //   // Password reset email sent!
  //   // ..
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <userAuthContext.Provider value={{ signUp, logIn, user, logOut, googleSignIn, resetPassword }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}









// Javascript version of UserAuthContext.ts

// import { createContext, useEffect, useState, useContext} from "react";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../lib/firebase";


// const userAuthContext = createContext();

// // interface IProps {
// //     children: React.ReactNode;
// //     }

// export function UserAuthContextProvider({ children }) {

//   const [user, setUser] = useState("");

//   function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }

//   function logIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   useEffect (() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       console.log(currentUser);
//     });
//     return () => { 
//       unsubscribe();
//      }
//   }, []);

//   return (
//     <userAuthContext.Provider value={{}}>{children}</userAuthContext.Provider>
//   );
// }

// export function useUserAuth() {
//     return useContext(userAuthContext);
//     }