import { useFirestore } from "../context/firestoreContext";
import { useLineName } from "../context/lineNameContext";
import { useCallback } from "react";

export const useCurrentUpdater = () => {
  const db = useFirestore();
  const lineName = useLineName();
  const callback = useCallback(
    queuerId => {
      if (!db || !lineName || !queuerId) {
        return Promise.resolve();
      }
      const doc = db.collection(`lines`).doc(lineName);
      return doc.update({ current: queuerId });
    },
    [db, lineName]
  );
  return callback;
};
