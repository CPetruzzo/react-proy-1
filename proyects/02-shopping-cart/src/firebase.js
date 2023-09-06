// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8bRKZLxxKczaIHD5l5HVe77okW4oTd_c",
  authDomain: "wegherosci.firebaseapp.com",
  projectId: "wegherosci",
  storageBucket: "wegherosci.appspot.com",
  messagingSenderId: "950697498347",
  appId: "1:950697498347:web:026fc588ba96097fae90ae",
  measurementId: "G-LYFXHYKLT2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
