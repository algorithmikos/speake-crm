import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";

export const createClass = async (sessionClass) => {
  if (!sessionClass.id) {
    toast.error("Please refresh the page and try again");
    return;
  }

  if (!sessionClass.days.length) {
    toast.error("You must provide days on which the class is held");
    return;
  }

  if (!sessionClass.startTime) {
    toast.error("You must provide the time at which the class starts");
    return;
  }

  if (!sessionClass.endTime) {
    toast.error("You must provide the time at which the class ends");
    return;
  }

  if (!sessionClass.place) {
    toast.error("You must provide the place in which the class ends");
    return;
  }

  const classesDocRef = doc(db, "utils", "classes");

  await updateDoc(classesDocRef, {
    value: arrayUnion(sessionClass),
  });
};
