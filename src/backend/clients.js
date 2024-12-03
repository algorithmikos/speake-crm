import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  increment,
  where,
  getDocs,
  query,
  onSnapshot,
  setDoc,
  deleteDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { capitalizeFirstLetters, getDigitsOnly } from "../utils/dataCleaning";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

export const addNewClient = async (client) => {
  const clientCollectionRef = collection(db, "clients");
  const leadsDocRef = doc(db, "utils", "leads");

  const leadsDoc = await getDoc(leadsDocRef);

  const currentLeadId = leadsDoc.data().currentLeadId;

  if (client.phoneNum) {
    const cleanPhoneNum = getDigitsOnly(client.phoneNum);

    if (cleanPhoneNum) {
      const q = query(
        clientCollectionRef,
        where("phoneNum", "==", cleanPhoneNum)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          toast.warn(
            `Client with this phone number already exists with ID [${
              doc.data().leadId
            }]`
          );
        });
        return;
      }
    }
  }

  if (!client.leadSource || client.leadSource === "n/a") {
    toast.error(
      `The lead soruce from which the client number is obtained must be specified!`
    );
    return;
  }

  const name = client.name
    ? capitalizeFirstLetters(client.name).trim()
    : "Unknown";
  const phoneNum = client.phoneNum ? getDigitsOnly(client.phoneNum) : "";
  const area = client.area ? client.area.trim() : "";

  const cleanClient = {
    ...client,
    leadId: currentLeadId,
    name: name,
    phoneNum: phoneNum,
    area: area,
    leadSource: client.leadSource || "",
    status: client.status || "",
    priority: client.priority || "",
    type: client.type || "",
    class: client.class || "",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(clientCollectionRef, cleanClient);

  // Update currentLeadId
  await updateDoc(leadsDocRef, {
    currentLeadId: increment(1),
  });

  return true;
};

export const updateClient = async (client, updatedFields) => {
  const fields = Object.keys(updatedFields);
  const clientCollectionRef = collection(db, "clients");

  if (
    fields.includes("phoneNum") &&
    updatedFields.phoneNum.old &&
    updatedFields.phoneNum.new
  ) {
    if (updatedFields.phoneNum.old !== updatedFields.phoneNum.new) {
      const cleanPhoneNum = getDigitsOnly(client.phoneNum);

      if (cleanPhoneNum) {
        const q = query(
          clientCollectionRef,
          where("phoneNum", "==", cleanPhoneNum)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            toast.warn(
              `Client with this phone number already exists with ID [${
                doc.data().leadId
              }]`
            );
          });
          return;
        }
      }
    }
  }

  const cleanClient = cleanClientData(client, fields);

  await updateDoc(doc(db, "clients", client.id), cleanClient);

  return true;
};

export const deleteClient = async (client) => {
  if (client.nextAction === "archive") {
    const clientArchiveCollectionRef = collection(db, "clientsArchive");

    const archiveDocRef = doc(clientArchiveCollectionRef, client.id);
    const archivedDoc = { ...client, archivedAt: serverTimestamp() };
    await setDoc(archiveDocRef, archivedDoc);

    await deleteDoc(doc(db, "clients", client.id));
  } else {
    toast.error(`Client ${client.leadId} is not scheduled for deletion`);
  }
};

function cleanClientData(client, allowedFields) {
  const cleanClient = {};

  allowedFields.forEach((field) => {
    if (client[field] !== undefined) {
      const value = client[field];
      if (field === "name") {
        cleanClient[field] = capitalizeFirstLetters(value).trim();
      } else if (field === "phoneNum") {
        cleanClient[field] = getDigitsOnly(client.phoneNum);
      } else {
        if (typeof value === "string") {
          cleanClient[field] = value.trim();
        } else {
          cleanClient[field] = value;
        }
      }
    }
  });

  return cleanClient;
}
