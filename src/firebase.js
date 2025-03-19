import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBwd6vjIjz0FUURcan0qdaZgoOw2rs7bYw",
//   authDomain: "rentelly-c7100.firebaseapp.com",
//   projectId: "rentelly-c7100",
//   storageBucket: "rentelly-c7100.firebasestorage.app",
//   messagingSenderId: "471293754152",
//   appId: "1:471293754152:web:d7ad053978eb4415ddee1d",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBO9Xm86lp044-n_-_GozNgQK0XADJylbY",
  authDomain: "bite-8be90.firebaseapp.com",
  projectId: "bite-8be90",
  storageBucket: "bite-8be90.firebasestorage.app",
  messagingSenderId: "687582457116",
  appId: "1:687582457116:web:58a785f0f55ecada8bded9",
  measurementId: "G-3D3Q803QP2",
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      // "BEvdnHOIptxYCrcOr17DPkNDJ5drpZ-0FRIOYn0F_HM9uV7Bl_yAsb4_3vBIpgqUGsrjc_o7u9imsJBL69Ejs6M",
      "",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
