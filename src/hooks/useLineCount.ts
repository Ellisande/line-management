import { useContext, useState, useEffect } from "react";
import { FirestoreContext } from "../context/firestoreContext";
import { useLineName } from "../context/lineNameContext";
import { Queuer } from "../Queuer";

const notInLine = (queuer: Queuer) =>
  !queuer.skippedAt && !queuer.leftAt && !queuer.servicedAt;

const upUntilNumber = (stopAt: number) => (queuer: Queuer) =>
  queuer.number < stopAt;

export const useLineCount = (stopAt: number | undefined) => {
  const firestore = useContext(FirestoreContext);
  const lineName = useLineName();
  const [querers, setQueuers] = useState<Queuer[]>([]);
  useEffect(() => {
    if (!firestore) {
      return () => {};
    }
    return firestore
      .collection(`lines/${lineName}/queuers`)
      .orderBy("number", "asc")
      .onSnapshot(snapshot => {
        let tempQueuers: Queuer[] = [];
        snapshot.forEach(doc => {
          const queuer = <Queuer>doc.data();
          tempQueuers = [...tempQueuers, queuer];
        });
        setQueuers(tempQueuers);
      });
  }, [firestore]);
  const inLine = querers.filter(notInLine);
  const onlyTillNumber = stopAt ? inLine.filter(upUntilNumber(stopAt)) : inLine;
  return onlyTillNumber.length;
};

export const useNumbersAhead = (stopAt: number) => useLineCount(stopAt);
