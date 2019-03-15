import { useState, useEffect } from "react";
import { useFirebaseAuth } from "../context/firebaseAuthContext";

export const useAuthenticated = () => {
  const auth = useFirebaseAuth();

  const [userId, setUserId] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!auth) {
      return () => {};
    }
    return auth.onAuthStateChanged(user => {
      setUserId(user ? user.uid : undefined);
    });
  });
  return userId;
};
