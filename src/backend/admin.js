import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const updateVersion = async (version) => {
  try {
    const appVersionDocRef = doc(db, "utils", "appVersion");

    await updateDoc(appVersionDocRef, {
      value: version?.trim(),
    });

    return 2;
  } catch (e) {
    console.warn(e);
    return 1;
  }
};
