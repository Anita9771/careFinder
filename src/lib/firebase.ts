// import { us } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import firebase from 'firebase/app';
// import "firebase/storage";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBR-aZSfKpocE0skkqIzfW_CtxcAgcVLQc",
  authDomain: "carefinder-bc73b.firebaseapp.com",
  databaseURL: "https://carefinder-bc73b-default-rtdb.firebaseio.com",
  projectId: "carefinder-bc73b",
  storageBucket: "carefinder-bc73b.appspot.com",
  messagingSenderId: "458177730928",
  appId: "1:458177730928:web:cc241cc2ed83a687cbd7b5",
  measurementId: "G-SSWS7VNG20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = firebase.storage();
// const storageRef = storage.ref();

export const storage = getStorage();
export const storageRef = ref(storage);


// export 