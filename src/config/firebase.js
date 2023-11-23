import { initializeApp } from "@firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, FIREBASE_APP_ID, MEASUREMENT_ID } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use getReactNativePersistence to get persistence for React Native
const authPersistence = getReactNativePersistence(AsyncStorage);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: authPersistence
});

const db = getFirestore(app);

export { auth, db };
