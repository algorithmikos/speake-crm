export const getLocalStorageUserDoc = async () => {
  const request = indexedDB.open("firebaseLocalStorageDb", 1);

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
    return null; // Indicate error by returning null
  };

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const indexedDB = event.target.result;

      const transaction = indexedDB.transaction(
        "firebaseLocalStorage",
        "readonly"
      );
      const firebaseLocalStorage = transaction.objectStore(
        "firebaseLocalStorage"
      );

      const getRequest = firebaseLocalStorage.get(
        "firebase:authUser:AIzaSyBaIYdOhfB9htgSQqEVCCauM_sUsMKJF5Q:[DEFAULT]"
      );

      getRequest.onsuccess = (event) => {
        const result = event.target.result;
        if (!result) {
          resolve(null); // No user data found, return null
          return;
        }

        const { value } = result;
        const userDoc = {
          uid: value.uid,
          email: value.email,
          stsTokenManager: value.stsTokenManager,
          createdAt: value.createdAt,
          lastLoginAt: value.lastLoginAt,
          emailVerified: value.emailVerified,
        };

        resolve(userDoc);
      };

      getRequest.onerror = (event) => {
        console.error("Error getting record:", event.target.error);
        reject(event.target.error); // Reject with error object
      };

      transaction.oncomplete = () => {
        indexedDB.close();
      };
    };
  });
};
