import { getMessaging, getToken } from "firebase/messaging";

// VAPID Key를 Firebase Console에서 가져와서 대체
const vapidKey =
  "BFZ4LcXav8nts5S0szjTh_gxE5tRcoyr1zKC0N4waKim980YlIcCWVAO7UrxEkLwgJ5X8o_fhtEIOSRe";

const messaging = getMessaging();
getToken(messaging, { vapidKey })
  .then((currentToken) => {
    if (currentToken) {
      // 서버로 토큰을 보내고 필요한 경우 UI 업데이트
      // ...
    } else {
      // 퍼미션 요청 UI 표시
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
