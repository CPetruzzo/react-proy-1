import { getFirestore } from "@firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJvyEL1AeW0zXLSYkzTtSzuTaxOd_Zc-g",
  authDomain: "tasklist-748a4.firebaseapp.com",
  projectId: "tasklist-748a4",
  storageBucket: "tasklist-748a4.appspot.com",
  messagingSenderId: "188369773251",
  appId: "1:188369773251:web:27fa31a922b9823ea7b876",
  measurementId: "G-VZHEQYQJXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore }; // Asegúrate de exportar firestore
