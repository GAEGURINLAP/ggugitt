importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging.js"
);

const config = {
  apiKey: "AIzaSyB4nSKNemv46Pnj_k5lz83zxrUeWk_0_L0",
  projectId: "bullgaemi-survey",
  messagingSenderId: "441940389851",
  appId: "1:441940389851:web:972dabf13186ace4f541fe",
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging
  .getToken({
    vapidKey:
      "BFZ4LcXav8nts5S0szjTh_gxE5tRcoyr1zKC0N4waKim980YlIcCWVAO7UrxEkLwgJ5X8o_fhtEIOSRe",
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log("성공 혹은??!");
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

// Rest of Service Worker event listener code
