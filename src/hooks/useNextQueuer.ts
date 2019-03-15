import { Queuer } from "./../Queuer";
import { useContext, useState, useEffect } from "react";
import { useLineName } from "../context/lineNameContext";
import { FirestoreContext } from "../context/firestoreContext";

const onlyUnserviced = (l: Queuer) => !l.servicedAt;
const onlyUnskipped = (l: Queuer) => !l.skippedAt;
const onlyNotLeft = (l: Queuer) => !l.leftAt;
const onlyNotPulled = (l: Queuer) => !l.pulledAt;

export const useNextQueuer = (): Queuer | undefined => {
  const firestore = useContext(FirestoreContext);
  const lineName = useLineName();
  const [queuers, setQueuers] = useState<Queuer[]>([]);
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
          const withId = { ...queuer, id: doc.id };
          tempQueuers = [...tempQueuers, withId];
        });
        setQueuers(tempQueuers);
      });
  }, [firestore]);
  const validQueuers = queuers
    .filter(onlyUnserviced)
    .filter(onlyUnskipped)
    .filter(onlyNotLeft)
    .filter(onlyNotPulled);
  return validQueuers[0];
};
