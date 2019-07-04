import { useLineName } from "../context/lineNameContext";
import { useFirestore } from "../context/firestoreContext";
import { useEffect, useState } from "react";
import { firestore } from "firebase";

export const useLineData = (key: string): string => {
  const db = useFirestore();
  const lineName = useLineName();
  const [value, setValue] = useState<firestore.DocumentData | undefined>(
    undefined
  );
  useEffect(() => {
    if (!db || !lineName) {
      return () => {};
    }
    return db
      .collection(`lines`)
      .doc(lineName)
      .onSnapshot(doc => {
        if (doc.exists) {
          setValue(doc.data());
        }
      });
  }, [db, lineName, key]);
  return value && value[key];
};
