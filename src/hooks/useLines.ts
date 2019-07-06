import { useContext, useState, useEffect } from "react";
import { FirestoreContext } from "../context/firestoreContext";
import { Line } from "../Line";

export const useLines = () => {
  const firestore = useContext(FirestoreContext);
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    if (!firestore) {
      return () => { };
    }
    return firestore.collection("lines").onSnapshot(snapshot => {
      let tempLines: Line[] = [];
      snapshot.forEach(doc => {
        const newLine = <Line>{ ...doc.data(), name: doc.id };
        tempLines = [...tempLines, newLine];
      });
      setLines(tempLines);
    });
  }, [firestore]);
  return lines;
};
