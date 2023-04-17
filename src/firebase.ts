import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYn9PDSVQQUAx2oGGAF71tACFf51Vlc08",
  authDomain: "test-react-1a581.firebaseapp.com",
  projectId: "test-react-1a581",
  storageBucket: "test-react-1a581.appspot.com",
  messagingSenderId: "527409289131",
  appId: "1:527409289131:web:ab255a55ae0a1a3eb364ee"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
