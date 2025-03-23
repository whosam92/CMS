import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKVy7MjJkmqCOJRDeoxHORjMYqqVOn-D4",
  authDomain: "contract-management-soft-2401a.firebaseapp.com",
  projectId: "contract-management-soft-2401a",
  storageBucket: "contract-management-soft-2401a.firebasestorage.app",
  messagingSenderId: "1023380000798",
  appId: "1:1023380000798:web:daf8fd6187a4df9fdf1e0f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { provider };

// // Import Firebase dependencies
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAKVy7MjJkmqCOJRDeoxHORjMYqqVOn-D4",
//     authDomain: "contract-management-soft-2401a.firebaseapp.com",
//     projectId: "contract-management-soft-2401a",
//     storageBucket: "contract-management-soft-2401a.firebasestorage.app",
//     messagingSenderId: "1023380000798",
//     appId: "1:1023380000798:web:daf8fd6187a4df9fdf1e0f",
//   };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app); //  Ensure this line exists
// const auth = getAuth(app);
// export {  auth, db }; //  Ensure `db` is correctly exported
