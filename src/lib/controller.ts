import { AddHospitalType } from './../types/hospitals';
import {getFirestore, collection, addDoc} from "firebase/firestore";
import {app, storage} from "./firebase";
import { ref } from "firebase/storage";

export const firestore = getFirestore(app);

// Declare hospitals collection
export const hospitalsCol = collection(firestore, "hospitals");
export const hospitalRef = ref(storage, 'hospitals');

// Add a new document to hospital collection
export const addHospital = async (hospitalData: AddHospitalType) => {
    await addDoc(hospitalsCol, {...hospitalData});
}