// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import {FIREBASE_API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,FIREBASE_APP_ID,MEANSUREMENT_ID} from "@env"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDELZBFc8J26Cx7TLdpZyZPOlCls_lxaYc",
    authDomain: "prog4-healthapp.firebaseapp.com",
    projectId: "prog4-healthapp",
    storageBucket: "prog4-healthapp.appspot.com",
    messagingSenderId: "11934921754",
    appId: "1:11934921754:web:c17ca7817d604bf3e48da3",
    measurementId: "G-6R8T7FY5SE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}