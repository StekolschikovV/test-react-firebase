import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCYn9PDSVQQUAx2oGGAF71tACFf51Vlc08",
  authDomain: "test-react-1a581.firebaseapp.com",
  projectId: "test-react-1a581",
  storageBucket: "test-react-1a581.appspot.com",
  messagingSenderId: "527409289131",
  appId: "1:527409289131:web:ab255a55ae0a1a3eb364ee"
};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
