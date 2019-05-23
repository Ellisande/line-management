import { useFirebaseAuth } from "../context/firebaseAuthContext";
import { useEffect } from "react";

export const useSignOut = () => {
  const auth = useFirebaseAuth();
  const user = auth && auth.currentUser;
  return useEffect(() => {
    if (!auth || !user) {
      return () => {};
    }
    auth.signOut();
  }, [auth, user]);
};
