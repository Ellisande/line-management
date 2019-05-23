import { useRemoveFromLine } from "./useQueuerUpdater";
import { useLocalQueuer } from "./useLocalQueuer";
import { useCallback } from "react";

export const useRemoveSelf = () => {
  const { localQueuerId, clearLocalNumber } = useLocalQueuer();
  const queueRemover = useRemoveFromLine(localQueuerId);
  return useCallback(
    time => {
      queueRemover(time);
      clearLocalNumber();
    },
    [localQueuerId]
  );
};
