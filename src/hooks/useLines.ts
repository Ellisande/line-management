import { useContext, useState, useEffect } from "react";
import { FirestoreContext } from "../context/firestoreContext";
import { Line } from "../Line";

export const useLines = () => {
  const firestore = useContext(FirestoreContext);
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    if (!firestore) {
      return () => {};
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

export const useManagedLines = (userId?: string) => {
  const firestore = useContext(FirestoreContext);
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    if (!firestore || !userId) {
      return () => {};
    }
    return firestore
      .collection("lines")
      .where("owner", "==", userId)
      .onSnapshot(snapshot => {
        let tempLines: Line[] = [];
        snapshot.forEach(doc => {
          const newLine = <Line>{ ...doc.data(), name: doc.id };
          tempLines = [...tempLines, newLine];
        });
        setLines(tempLines);
      });
  }, [firestore, userId]);
  return lines;
};

interface ActiveLine {
  name: string;
  active: boolean;
}
export const useActiveLines = (userId?: string) => {
  const firestore = useContext(FirestoreContext);
  const [lines, setLines] = useState<ActiveLine[]>([]);
  useEffect(() => {
    if (!firestore || !userId) {
      return () => {};
    }
    return firestore
      .collection(`users/${userId}/lines`)
      .where("active", "==", true)
      .onSnapshot(snapshot => {
        let tempLines: ActiveLine[] = [];
        snapshot.forEach(doc => {
          const newLine = <ActiveLine>{ ...doc.data(), name: doc.id };
          tempLines = [...tempLines, newLine];
        });
        setLines(tempLines);
      });
  }, [firestore, userId]);
  return lines;
};
