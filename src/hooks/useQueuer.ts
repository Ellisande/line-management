import { Queuer } from "./../Queuer";
import { useLineName } from "../context/lineNameContext";
import { useFirestore } from "../context/firestoreContext";
import { useEffect, useState } from "react";

export const useQueuer = (
  queuerId: string | undefined | null
): Queuer | undefined => {
  const lineName = useLineName();
  const db = useFirestore();
  const [queuer, setQueuer] = useState<Queuer | undefined>(undefined);
  useEffect(() => {
    if (!db || !lineName || !queuerId) {
      setQueuer(undefined);
      return () => {};
    }
    return db
      .collection(`lines/${lineName}/queuers`)
      .doc(queuerId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = <Queuer>doc.data();
          const withId = { ...data, id: doc.id };
          setQueuer(withId);
        }
      });
  }, [db, lineName, queuerId]);
  return queuer;
};
