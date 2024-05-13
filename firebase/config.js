import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqQORGoDhNX6YEN30CmeZpoHQ6Ye9qpTU",
  authDomain: "zenwork-e88c0.firebaseapp.com",
  projectId: "zenwork-e88c0",
  storageBucket: "zenwork-e88c0.appspot.com",
  messagingSenderId: "158907552730",
  appId: "1:158907552730:web:7b89dad07af11f07a4e6e3"
};
const app = initializeApp(firebaseConfig);
const GoogleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db,GoogleProvider}