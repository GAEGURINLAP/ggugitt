import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4nSKNemv46Pnj_k5lz83zxrUeWk_0_L0",
  authDomain: "bullgaemi-survey.firebaseapp.com",
  projectId: "bullgaemi-survey",
  storageBucket: "bullgaemi-survey.appspot.com",
  messagingSenderId: "441940389851",
  appId: "1:441940389851:web:972dabf13186ace4f541fe",
  measurementId: "G-XTF0M3MMH3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
