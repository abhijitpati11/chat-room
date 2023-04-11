import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
 
const firebaseConfig = {
  apiKey: "AIzaSyA2JgkmQrgUdxswY7dGVHQ0o-dHttsI7TM",
  authDomain: "my-chat-room-6a47b.firebaseapp.com",
  projectId: "my-chat-room-6a47b",
  storageBucket: "my-chat-room-6a47b.appspot.com",
  messagingSenderId: "224655807131",
  appId: "1:224655807131:web:98e45ac8b31f5082c6ec3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// getting acces to authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// getting acces of the firestore database
export const db = getFirestore(app);