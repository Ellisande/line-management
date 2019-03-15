import { createContext, useContext } from "react";
import { auth } from "firebase";

const FirebaseAuthContext = createContext<auth.Auth | undefined>(undefined);

const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export { FirebaseAuthContext, useFirebaseAuth };
