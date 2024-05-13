import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

  export const getData = async (collection, document) => {

    const docRef = doc(db, collection, document);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  }