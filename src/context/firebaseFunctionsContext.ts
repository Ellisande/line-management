import { createContext, useContext } from "react";
import { functions } from "firebase";

const FirebaseFunctionsContext = createContext<functions.Functions | undefined>(undefined);

const useFirebaseFunctions = () => useContext(FirebaseFunctionsContext);

export { FirebaseFunctionsContext, useFirebaseFunctions };