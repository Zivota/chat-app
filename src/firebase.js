import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByENwPdH-5poz8F415vbFtmpGevVXkA-A",
  authDomain: "chat-app-v1-331aa.firebaseapp.com",
  projectId: "chat-app-v1-331aa",
  storageBucket: "chat-app-v1-331aa.appspot.com",
  messagingSenderId: "407263822274",
  appId: "1:407263822274:web:3fa363cceeea6d2045565b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
