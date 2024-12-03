import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { capitalizeFirstLetters, getDigitsOnly } from "../utils/dataCleaning";

export const addNewStudent = async (student) => {
  const studentCollectionRef = collection(db, "students");
  const studentIdDocRef = doc(db, "utils", "students");

  const studentIdDoc = await getDoc(studentIdDocRef);

  const currentStudentId = studentIdDoc.data().currentStudentId;

  if (student.phoneNum) {
    const cleanPhoneNum = getDigitsOnly(student.phoneNum);

    if (cleanPhoneNum) {
      const q = query(
        studentCollectionRef,
        where("phoneNum", "==", cleanPhoneNum)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          toast.warn(
            `Student with this phone number already exists with ID [${
              doc.data().studentId
            }]`
          );
        });
        return;
      }
    }
  }

  const name = student.name
    ? capitalizeFirstLetters(student.name).trim()
    : "Unknown";
  const phoneNum = student.phoneNum ? getDigitsOnly(student.phoneNum) : "";
  const area = student.area ? student.area.trim() : "";

  const createdAt = Timestamp.fromDate(new Date(student.createdAt));

  const cleanStudent = {
    studentId: currentStudentId,
    name: name,
    phoneNum: phoneNum,
    area: area,
    category: student.request,
    leadData: {
      leadId: student.leadId,
      leadSource: student.leadSource,
      nextAction: student.nextAction,
    },
    createdAt: student.createdAt ? createdAt : serverTimestamp(),
    convertedAt: serverTimestamp(),
  };

  if (student.type) {
    cleanStudent.type = student.type;
  }

  if (student.class) {
    cleanStudent.class = student.class;
  }

  if (student.notes) {
    cleanStudent.notes = student.notes;
  }

  if (student.priority) {
    cleanStudent.leadData.priority = student.priority;
  }

  if (student.calls) {
    cleanStudent.leadData.calls = student.calls;
  }

  const studentDocRef = doc(studentCollectionRef, student.id);
  await setDoc(studentDocRef, cleanStudent);

  // Update currentStudentId
  await updateDoc(studentIdDocRef, {
    currentStudentId: increment(1),
  });

  await deleteDoc(doc(db, "clients", student.id));

  return true;
};

export const updateStudent = async (student, updatedFields) => {
  const fields = Object.keys(updatedFields);
  const studentCollectionRef = collection(db, "students");

  if (fields.includes("phoneNum")) {
    const cleanPhoneNum = getDigitsOnly(student.phoneNum);

    if (cleanPhoneNum) {
      const q = query(
        studentCollectionRef,
        where("phoneNum", "==", cleanPhoneNum)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          toast.warn(
            `Student with this phone number already exists with ID [${
              doc.data().leadId
            }]`
          );
        });
        return;
      }
    }
  }

  const cleanStudent = cleanStudentData(student, fields);

  await updateDoc(doc(db, "students", student.id), cleanStudent);

  return true;
};

export const deleteStudent = async (student) => {
  const studentArchiveCollectionRef = collection(db, "studentsArchive");

  const archiveDocRef = doc(studentArchiveCollectionRef, student.id);
  await setDoc(archiveDocRef, student);

  await deleteDoc(doc(db, "students", student.id));
};

export const convertClientsToStudents = async (students) => {
  const clientsNumber = students.length;

  if (!clientsNumber) {
    toast.error("No selected clients to convert!");
    return;
  }

  toast.info(`Start converting ${clientsNumber} clients to students.`);

  try {
    const results = await Promise.all(
      students.map((student, index) =>
        addNewStudent(student).then((result) => {
          if (result) {
            toast.success(
              `${index + 1}. Client [ ${
                student.leadId
              } ] converted successfully into a student.`
            );
          } else {
            toast.error(
              `Failed to convert ${index + 1}. client with id [ ${
                student.leadId
              } ] into a student.`
            );
          }
        })
      )
    );

    const successfulConversions = results.filter(Boolean).length;

    if (successfulConversions > 0) {
      toast.success(
        `${successfulConversions} of ${clientsNumber} selected clients successfully converted into students.`
      );
    }
  } catch (error) {
    console.error("Error converting clients:", error);
    toast.error("An unexpected error occurred during conversion.");
  }
};

// Models
const studentModel = {
  id: String,
  studentId: String,
  name: String,
  phoneNum: String,
  category: String,
  type: String,
  class: String,
  sessions: Array([
    { sessionId: String, purchasedAt: Date, coupon: String, note: String },
  ]),
  area: String,
  notes: String,

  createdAt: Timestamp,
  convertedAt: Timestamp,

  leadData: Object({
    leadId: Number,
    leadSource: String,
    priority: String,
    nextAction: String,
    calls: Array,
  }),
};

function cleanStudentData(student, allowedFields) {
  const cleanStudent = {};

  allowedFields.forEach((field) => {
    if (student[field] !== undefined) {
      const value = student[field];
      if (field === "name") {
        cleanStudent[field] = capitalizeFirstLetters(value).trim();
      } else if (field === "phoneNum") {
        cleanStudent[field] = getDigitsOnly(student.phoneNum);
      } else {
        if (typeof value === "string") {
          cleanStudent[field] = value.trim();
        } else {
          cleanStudent[field] = value;
        }
      }
    }
  });

  return cleanStudent;
}
