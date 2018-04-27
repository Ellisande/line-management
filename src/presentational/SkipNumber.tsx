import * as React from "react";
import * as moment from "moment";
import { StyleSheet, css } from "aphrodite";

import SkipNumberUpdater from "../providers/SkipNumberUpdater";

const styles = StyleSheet.create({
  action: {
    // TODO: Have to be controlled theme
    fontSize: "20px"
  }
});

interface SkipProps {
  idToSkip: string;
  children: React.ReactNode;
}

const SkipNumber: React.SFC<SkipProps> = ({ children, idToSkip }) => (
  <SkipNumberUpdater id={idToSkip}>
    {onSkip => (
      <button
        className={css(styles.action)}
        onClick={() => onSkip(moment().format())}
      >
        {children}
      </button>
    )}
  </SkipNumberUpdater>
);

export default SkipNumber;
