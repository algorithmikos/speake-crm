import { toast } from "react-toastify";

export const handleFirestoreErrors = (errorCode) => {
  if (errorCode === "permission-denied") {
    toast.error("You don't have permission to do this action!");
  } else if (errorCode === "unauthenticated") {
    toast.error(
      "Couldn't perform reuqested action. Your session has expired, please log in again."
    );
  } else {
    toast.error(errorCode);
  }
};

export const handleFirebaseAuthErrors = (errorCode) => {
  if (errorCode === "auth/invalid-credential") {
    toast.error("E-Mail or password is incorrect!");
  } else if (errorCode === "auth/too-many-requests") {
    toast.error(
      "You been trying to log in too many times, please wait and try again later."
    );
  }
};
