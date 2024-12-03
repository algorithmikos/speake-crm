import {
  addDoc,
  arrayRemove,
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

export const createSession = async (session) => {
  // Validation
  if (!session.category) {
    toast.error("A session must have a category");
    return false;
  }

  if (!session.type) {
    toast.error("A session must have a type");
    return false;
  }

  const clientCollectionRef = collection(db, "sessions");

  const cleanSession = {
    ...session,
    createdAt: serverTimestamp(),
    sold: 0,
  };

  if (session.description) {
    cleanSession.description = session.description.trim();
  }

  await addDoc(clientCollectionRef, cleanSession);

  return true;
};

export const updateSession = async (session) => {
  // Validation
  if (!session.category) {
    toast.error("A session must have a category");
    return false;
  }

  const sessionsCollectionRef = collection(db, "sessions");
  const sessionDoc = doc(sessionsCollectionRef, session.id);

  const cleanSession = {
    category: session.category,
    type: session.type,
  };

  if (session.description) {
    cleanSession.description = session.description.trim();
  }

  await updateDoc(sessionDoc, cleanSession);

  return true;
};

export const updateSessionCoupons = async (session) => {
  const sessionsCollectionRef = collection(db, "sessions");
  const sessionDoc = doc(sessionsCollectionRef, session.id);

  const cleanSession = {
    coupons: session.coupons,
  };

  await updateDoc(sessionDoc, cleanSession);

  return true;
};

export const updateSessionPostPurchase = async (session, coupon) => {
  const sessionsCollectionRef = collection(db, "sessions");
  const sessionDoc = doc(sessionsCollectionRef, session.id);

  await updateDoc(sessionDoc, {
    coupons: arrayRemove(coupon),
    sold: increment(1),
  });

  return true;
};

// Models

const sessionModel = {
  id: String,
  category: String,
  coupons: Array,
  createdAt: Timestamp,
  description: String,
  sold: Number,
  type: String,
};
