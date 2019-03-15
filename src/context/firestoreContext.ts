import { createContext, useContext } from "react";
import { firestore } from "firebase";

const FirestoreContext = createContext<firestore.Firestore | undefined>(
  undefined
);

const useFirestore = () => useContext(FirestoreContext);

export { FirestoreContext, useFirestore };
