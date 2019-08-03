import { useState, useEffect, useCallback } from "react";
import { useFirebaseAuth } from "../context/firebaseAuthContext";
import { useFirebaseFunctions } from "../context/firebaseFunctionsContext";

export const useClearLine = () => {
  const functions = useFirebaseFunctions();
  const clearLineCB = useCallback(
    (lineName: string | undefined) => {
      if (!functions || !lineName) {
        return;
      }
      var deleteFn = functions.httpsCallable("clearLine");
      return deleteFn({ line_name: lineName });
    },
    [functions]
  );
  return clearLineCB;
};
