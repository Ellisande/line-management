import { useLineName } from "../context/lineNameContext";
import { useQueuer } from "./useQueuer";
import { useEffect, useState } from "react";

export const useLocalQueuerId = () => {
  const lineName = useLineName();
  const storageKey = `${lineName}:number:`;
  return useState<string | undefined>(
    localStorage.getItem(storageKey) || undefined
  );
};

export const useLocalQueuer = () => {
  const lineName = useLineName();
  const storageKey = `${lineName}:number:`;
  const [localQueuerId, setLocalQueuerId] = useLocalQueuerId();
  useEffect(() => {
    if (!localQueuerId) {
      localStorage.removeItem(storageKey);
      return;
    }
    localStorage.setItem(storageKey, localQueuerId);
  }, [storageKey, localQueuerId]);
  const updater = setLocalQueuerId;
  const remover = () => setLocalQueuerId(undefined);
  return {
    localQueuerId: localQueuerId,
    setLocalNumber: updater,
    clearLocalNumber: remover
  };
};
