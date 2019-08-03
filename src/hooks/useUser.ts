import { User } from "./../User";
import { useFirestore } from "../context/firestoreContext";
import { useEffect, useState } from "react";

export const useUser = (
  userId: string | undefined | null
): User | undefined => {
  const db = useFirestore();
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    // Just stop if we don't have dependencies
    if (!db || !userId) {
      setUser(undefined);
      return () => {};
    }
    // Fetch the data
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = <User>doc.data();
          const withId = { ...data, id: doc.id };
          setUser(withId);
        }
      });
  }, [db, userId]);
  return user;
};
