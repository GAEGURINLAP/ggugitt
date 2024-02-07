import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// measurementId: "G-XTF0M3MMH3",

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const isPRD = import.meta.env.VITE_ENV === "prd" ? true : false;

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);

export const messaging = getMessaging(app);

// getToken(messaging, {
//   vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
// });

// export function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//     }
//   });
// }

// FCM 설정 및 알림 권한 요청
export const initFCM = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    console.log("FCM Token:", token);

    console.log("Requesting permission...");
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  } catch (error) {
    console.error("Error initializing FCM:", error);
  }
};

export const requestNotificationPermission = async () => {
  try {
    console.log("Requesting permission...");
    const permission = await Notification.requestPermission();
    console.log("Permission status:", permission);

    if (permission === "granted") {
      console.log("Notification permission granted.");
      // FCM 설정 및 토큰 요청 등 추가 작업 수행
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
  }
};

// FCM 초기화 호출
initFCM();
