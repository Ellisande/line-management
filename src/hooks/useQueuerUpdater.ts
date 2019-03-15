import { useFirestore } from "../context/firestoreContext";
import { useLineName } from "../context/lineNameContext";
import { useCallback } from "react";
import moment from "moment";

const useQueuerUpdater = (queuerId?: string) => {
  const db = useFirestore();
  const lineName = useLineName();
  const callback = useCallback(
    (field, value) => {
      if (!db || !lineName || !queuerId) {
        return Promise.resolve();
      }
      const doc = db.collection(`lines/${lineName}/queuers`).doc(queuerId);
      return doc.update({ [field]: value });
    },
    [db, lineName, queuerId]
  );
  return callback;
};

export const useOnTheWayUpdater = (queuerId?: string) => {
  const updater = useQueuerUpdater(queuerId);
  return (time: moment.Moment) => updater("onTheWayAt", time.format());
};

export const useSkipNumberUpdater = (queuerId?: string) => {
  const updater = useQueuerUpdater(queuerId);
  return (time: moment.Moment) => updater("skippedAt", time.format());
};

export const useRemoveFromLine = (queuerId?: string) => {
  const updater = useQueuerUpdater(queuerId);
  return (time: moment.Moment) => updater("leftAt", time.format());
};

export const useMarkServiced = (queuerId?: string) => {
  const updater = useQueuerUpdater(queuerId);
  return (time: moment.Moment) => updater("servicedAt", time.format());
};

export const usePullNumber = (queuerId?: string) => {
  const updater = useQueuerUpdater(queuerId);
  return (time: moment.Moment) => updater("pulledAt", time.format());
};
