import { useContext, useState, useEffect } from "react";
import { FirestoreContext } from "../context/firestoreContext";
import { firestore } from "firebase";

export const useLines = () => {
  const firestore = useContext(FirestoreContext);
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    if (!firestore) {
      return () => {};
    }
    return firestore.collection("lines").onSnapshot(snapshot => {
      let tempLines: string[] = [];
      snapshot.forEach(doc => {
        tempLines = [...tempLines, doc.id];
      });
      setLines(tempLines);
    });
  }, [firestore]);
  return lines;
};
