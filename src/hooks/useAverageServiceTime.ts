import { useContext, useState, useEffect } from "react";
import moment from "moment";
import { FirestoreContext } from "../context/firestoreContext";
import { useLineName } from "../context/lineNameContext";
import { Queuer } from "../Queuer";

const complete = (queuer: Queuer) => queuer.pulledAt && queuer.servicedAt;

const toServiceTime = (queuer: Queuer) =>
  moment(queuer.servicedAt).diff(moment(queuer.pulledAt));
const sum = (total: number, serviceTime: number) => total + serviceTime;

export const useAverageServiceTime = () => {
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
  const finished = querers.filter(complete);
  const serviceTimes = finished.map(toServiceTime);
  const total = serviceTimes.reduce(sum, 0);
  const average = serviceTimes.length ? total / serviceTimes.length : 0;
  return average;
};
