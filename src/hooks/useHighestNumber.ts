import { useContext, useState, useEffect } from "react";
import { FirestoreContext } from "../context/firestoreContext";
import { useLineName } from "../context/lineNameContext";
import { Queuer } from "../Queuer";

export const useHighestNumber = () => {
  const firestore = useContext(FirestoreContext);
  const lineName = useLineName();
  const [queuers, setQueuers] = useState<Queuer[]>([]);
  useEffect(() => {
    if (!firestore) {
      return () => {};
    }
    return firestore
      .collection(`lines/${lineName}/queuers`)
      .orderBy("number", "desc")
      .limit(1)
      .onSnapshot(snapshot => {
        let tempQueuers: Queuer[] = [];
        snapshot.forEach(doc => {
          const queuer = <Queuer>doc.data();
          tempQueuers = [...tempQueuers, queuer];
        });
        setQueuers(tempQueuers);
      });
  }, [firestore]);
  const latestQueuer = queuers[0];
  return latestQueuer ? latestQueuer.number : 0;
};
