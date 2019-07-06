/** @jsx jsx */
import { jsx } from "@emotion/core";
import { WithoutNumber } from "./WithoutNumber";
import { WithNumber } from "./WithNumber";
import { useQueuer } from "../../hooks/useQueuer";
import { useLineName } from "../../context/lineNameContext";
import { createContext, useState, useCallback, useEffect, Fragment } from "react";
import { useLineExists } from "../../hooks/useLineExists";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";

const LocalQueuerIdContext = createContext<string | undefined>(undefined);

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '40vh'
  }
});


export const User = () => {
  const styles = useStyle(styleBuilder);
  const lineName = useLineName();
  const lineExists = useLineExists();
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
    <Fragment>
      {lineExists && <LocalQueuerIdContext.Provider value={localQueuerId}>
        {localQueuer && !localQueuer.leftAt ? (
          <WithNumber
            localQueuer={localQueuer}
            clearLocalQueuerId={clearLocalQueuerId}
          />
        ) : (
            <WithoutNumber setLocalQueuerId={setLocalQueuerId} />
          )}
      </LocalQueuerIdContext.Provider>}
      {!lineExists &&
        <div css={styles.emptyState}>
          <div>This line does not exist.</div>
          <div>Check your url or re-scan the QR code.</div>
        </div>
      }
    </Fragment>
  );
};
