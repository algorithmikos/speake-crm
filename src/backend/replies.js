import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const createReply = async (reply) => {
  const repliesDocRef = doc(db, "utils", "replies");

  await updateDoc(repliesDocRef, {
    value: arrayUnion(reply),
  });
};

export const updateReply = async (replies) => {
  const repliesDocRef = doc(db, "utils", "replies");

  await updateDoc(repliesDocRef, {
    value: replies,
  });
};

export const deleteReply = async (replies) => {
  const repliesDocRef = doc(db, "utils", "replies");

  await updateDoc(repliesDocRef, {
    value: replies,
  });
};
