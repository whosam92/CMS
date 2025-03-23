import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAKVy7MjJkmqCOJRDeoxHORjMYqqVOn-D4",
    authDomain: "contract-management-soft-2401a.firebaseapp.com",
    projectId: "contract-management-soft-2401a",
    storageBucket: "contract-management-soft-2401a.firebasestorage.app",
    messagingSenderId: "1023380000798",
    appId: "1:1023380000798:web:daf8fd6187a4df9fdf1e0f"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db ,auth };
