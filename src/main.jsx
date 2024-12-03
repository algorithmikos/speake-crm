import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "react-awesome-button/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { version as runningAppVersion } from "../package.json";
import { toast } from "react-toastify";
import { store } from "./rtk/store";
import { Provider } from "react-redux";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/sw.js")
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(async (registration) => {
      console.log("Service Worker registered with scope:", registration.scope);

      const updateFunction = async () => {
        // Check online state from localStorage
        const firestoreOnlineState = window.localStorage.getItem(
          "firestore_online_state_firestore/[DEFAULT]/speak-english-teaching/"
        );

        if (firestoreOnlineState) {
          const isOnline = JSON.parse(firestoreOnlineState);

          // Check online state and app version if online
          if (isOnline.onlineState === "Online") {
            const appVersionDoc = await getDoc(doc(db, "utils", "appVersion"));
            const currentAppVersion = appVersionDoc.data().value;

            if (currentAppVersion !== runningAppVersion) {
              toast.info("Newer app version detected. Clearing cache...", {
                theme: "dark",
              });
              // Clear all caches here
              return caches.keys().then((cacheNames) => {
                return Promise.all(
                  cacheNames.map((cacheName) => {
                    return caches.delete(cacheName);
                  })
                );
              });
            } else {
              console.log("App is up-to-date. No cache clearing necessary.");
            }
          } else {
            console.log("Device is offline. Skipping cache check.");
          }
        } else {
          console.log(
            "Firestore online state not found. Skipping cache check."
          );
        }
      };

      await updateFunction();

      // registration.addEventListener("activate", async (event) => {
      //   console.log(event);

      // });
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
