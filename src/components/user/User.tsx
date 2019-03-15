/** @jsx jsx */
import { jsx } from "@emotion/core";
import { WithoutNumber } from "./WithoutNumber";
import { WithNumber } from "./WithNumber";
import { useQueuer } from "../../hooks/useQueuer";
import { useLineName } from "../../context/lineNameContext";
import { createContext, useState, useCallback, useEffect } from "react";

const LocalQueuerIdContext = createContext<string | undefined>(undefined);

export const User = () => {
  const lineName = useLineName();
  const storageKey = `${lineName}:number:`;
  const [localQueuerId, setLocalQueuerId] = useState(
    localStorage.getItem(storageKey) || undefined
  );
  const clearLocalQueuerId = useCallback(() => {
    setLocalQueuerId(undefined);
  }, [lineName]);
  useEffect(() => {
    if (localQueuerId) {
      return localStorage.setItem(storageKey, localQueuerId);
    }
    return localStorage.removeItem(storageKey);
  }, [lineName, localQueuerId]);
  const localQueuer = useQueuer(localQueuerId);
  return (
    <LocalQueuerIdContext.Provider value={localQueuerId}>
      {localQueuer && !localQueuer.leftAt ? (
        <WithNumber
          localQueuer={localQueuer}
          clearLocalQueuerId={clearLocalQueuerId}
        />
      ) : (
        <WithoutNumber setLocalQueuerId={setLocalQueuerId} />
      )}
    </LocalQueuerIdContext.Provider>
  );
};
