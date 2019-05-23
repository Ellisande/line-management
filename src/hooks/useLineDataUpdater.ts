import { Line } from "./../Line";
import { useFirestore } from "../context/firestoreContext";
import { useLineName } from "../context/lineNameContext";
import { useCallback } from "react";
import moment from "moment";
import { firestore } from "firebase";

const useLineDataUpdater = () => {
  const db = useFirestore();
  const lineName = useLineName();
  const callback = useCallback(
    (field: keyof Line, value: string) => {
      if (!db || !lineName || !field) {
        return Promise.resolve();
      }
      const doc = db.collection(`lines`).doc(lineName);
      return doc.update({ [field]: value });
    },
    [db, lineName]
  );
  return callback;
};

export const useCurrentUpdater = () => {
  const updater = useLineDataUpdater();
  return (queuerId: string) => updater("current", queuerId);
};

export const useStartedAcceptingUpdater = () => {
  const updater = useLineDataUpdater();
  return (time: moment.Moment) => updater("startedAcceptingAt", time.format());
};

export const useStoppedAcceptingUpdater = () => {
  const updater = useLineDataUpdater();
  return (time: moment.Moment) => updater("stoppedAcceptingAt", time.format());
};

export const useStoppedAcceptingRemover = () => {
  const db = useFirestore();
  const lineName = useLineName();
  const callback = useCallback(() => {
    if (!db || !lineName) {
      return Promise.resolve();
    }
    const doc = db.collection(`lines`).doc(lineName);
    return doc.update({
      stoppedAcceptingAt: firestore.FieldValue.delete()
    });
  }, [db, lineName]);
  return callback;
};
