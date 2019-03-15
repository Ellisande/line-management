import { useLineName } from "../context/lineNameContext";
import { Queuer } from "../Queuer";
import { useCallback } from "react";
import { useFirestore } from "../context/firestoreContext";
import { firestore } from "firebase";
import { useQueuer } from "./useQueuer";
import { useLocalQueuer } from "./useLocalQueuer";

export interface Appender {
  (newQueuer: Partial<Queuer>): Promise<
    firestore.DocumentReference | undefined
  >;
}

export const useLineAppender = () => {
  const firestore = useFirestore();
  const lineName = useLineName();
  const { setLocalNumber } = useLocalQueuer();
  const updater: Appender = useCallback(
    queuer => {
      if (!firestore) {
        return Promise.resolve(undefined);
      }
      const ref = firestore.collection(`lines/${lineName}/queuers/`);
      const promisedQueuer = ref.add(queuer);
      promisedQueuer.then(doc => doc && setLocalNumber(doc.id));
      return promisedQueuer;
    },
    [firestore, lineName]
  );

  return updater;
};
