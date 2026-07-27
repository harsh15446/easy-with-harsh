import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA_Io6tr7VRvluXOfY4bCMURPP4vmlE0iY",
  authDomain: "easy-with-harsh.firebaseapp.com",
  projectId: "easy-with-harsh",
  storageBucket: "easy-with-harsh.firebasestorage.app",
  messagingSenderId: "449027288278",
  appId: "1:449027288278:web:b501fe7e7f5d8dc1512d77"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);