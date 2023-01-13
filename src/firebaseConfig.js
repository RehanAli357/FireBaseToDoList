import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAskvFWQ6rCxpBERUopMAHlpMKaFBU5brA",
    authDomain: "crud-todo-9ac98.firebaseapp.com",
    projectId: "crud-todo-9ac98",
    storageBucket: "crud-todo-9ac98.appspot.com",
    messagingSenderId: "842709463812",
    appId: "1:842709463812:web:3d04ec1f00162d155b9651"
  };
  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  export default db;
