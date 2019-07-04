import { Line, GroupPreference, SkipPreference, CallPreference, DurationPreference, CapacityPreference } from "./../Line";
import { useFirestore } from "../context/firestoreContext";
import { useLineName } from "../context/lineNameContext";
import { useCallback } from "react";
import moment from "moment";
import { firestore } from "firebase";

const useLineDataUpdater = () => {
  const db = useFirestore();
  const lineName = useLineName();
  const callback = useCallback(
    (field: keyof Line, value: string | number) => {
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

export const useGroupPreferenceUpdater = () => {
  const updater = useLineDataUpdater();
  return (groupPreference: GroupPreference) => updater("groupPreference", groupPreference);
}

export const useSkipPreferenceUpdater = () => {
  const updater = useLineDataUpdater();
  return (skipPreference: SkipPreference) => updater("skipPreference", skipPreference);
}

export const useCallPreferenceUpdater = () => {
  const updater = useLineDataUpdater();
  return (callPreference: CallPreference) => updater("callPreference", callPreference);
}

export const useStoppedAcceptingUpdater = () => {
  const updater = useLineDataUpdater();
  return (time: moment.Moment) => updater("stoppedAcceptingAt", time.format());
};

export const useDurationPreferenceUpdater = () => {
  const updater = useLineDataUpdater();
  return (maxDuration: number | DurationPreference) => 
    updater('maxDuration', maxDuration);
}

export const useCapacityPreferenceUpdater = () => {
  const updater = useLineDataUpdater();
  return (maxCapacity: number | CapacityPreference) => updater('maximumCapacity', maxCapacity)
}

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

export const useClearCurrent = () => {
  const db = useFirestore();
  const lineName = useLineName();
  const callback = useCallback(() => {
    if (!db || !lineName) {
      return Promise.resolve();
    }
    const doc = db.collection(`lines`).doc(lineName);
    return doc.update({
      current: firestore.FieldValue.delete()
    });
  }, [db, lineName]);
  return callback;
};
