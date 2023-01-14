import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import firebaseConfig from "./firebase";
  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  export default db;
