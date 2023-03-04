// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD23gYf8Y0a7_BVfSxGy65ULL3jnkQ8pAA",
  authDomain: "img-uploader-ba75b.firebaseapp.com",
  projectId: "img-uploader-ba75b",
  storageBucket: "img-uploader-ba75b.appspot.com",
  messagingSenderId: "128141327069",
  appId: "1:128141327069:web:acd7fcf7fa879613cd7934",
  measurementId: "G-TLPX20LH36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
