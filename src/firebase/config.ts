import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcdHpg9fggzfNRus8mB1MDzFE96i_zDfQ",
  authDomain: "miniblog-519fe.firebaseapp.com",
  projectId: "miniblog-519fe",
  storageBucket: "miniblog-519fe.appspot.com",
  messagingSenderId: "857520941763",
  appId: "1:857520941763:web:4aefc9b66b025990da1076",
  //PASTE YOUR FIREBASE SETTINGS HERE
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
