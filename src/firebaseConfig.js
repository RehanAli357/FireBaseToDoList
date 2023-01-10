import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyDnnG8_DOKC0NDXU3Cmoi5h8D73sthzZd4",
    authDomain: "fir-crud-d7298.firebaseapp.com",
    projectId: "fir-crud-d7298",
    storageBucket: "fir-crud-d7298.appspot.com",
    messagingSenderId: "911568641946",
    appId: "1:911568641946:web:644dfc35360111482ca423",
    measurementId: "G-7WCE5DTQWV"
};

const app=initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;