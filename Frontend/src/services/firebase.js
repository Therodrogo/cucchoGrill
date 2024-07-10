// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDubcfvWGWQCZJAsKfmRXzQFZkOZVDNisU",
  authDomain: "cucchogrill-9ff9e.firebaseapp.com",
  projectId: "cucchogrill-9ff9e",
  storageBucket: "cucchogrill-9ff9e.appspot.com",
  messagingSenderId: "743527825958",
  appId: "1:743527825958:web:17a94020dcafd9b82b1ce7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)