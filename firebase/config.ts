import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  //PAST YOUR FIREBASE SETTINGS HERE
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
