// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from "firebase/firestore";
// You'll add more imports here as you use other Firebase products,
// like getAuth for Authentication, getFirestore for Firestore, etc.
// Your web app's Firebase configuration
// Paste the firebaseConfig object you copied from the Firebase Console here
const firebaseConfig = {
  apiKey: "AIzaSyDV5grX4jlhNZikxnjbjy6atVNTtVJayAA",
  authDomain: "teens-and-kids-delight.firebaseapp.com",
  projectId: "teens-and-kids-delight",
  storageBucket: "teens-and-kids-delight.firebasestorage.app",
  messagingSenderId: "289588893945",
  appId: "1:289588893945:web:23f9c45ede391c5eedaa28",
  measurementId: "G-WJXMQHWYY5"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
// You can now export the 'app' object if other parts of your app
// need to access the initialized Firebase instance.
// For example:
// export { app };
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
