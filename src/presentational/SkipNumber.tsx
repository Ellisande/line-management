import * as React from "react";
import * as moment from "moment";
import SkipNumberUpdater from "../providers/SkipNumberUpdater";

interface SkipProps {
  idToSkip: string;
  children: React.ReactNode;
}

const SkipNumber: React.SFC<SkipProps> = ({ children, idToSkip }) => (
  <SkipNumberUpdater id={idToSkip}>
    {onSkip => (
      <button onClick={() => onSkip(moment().format())}>{children}</button>
    )}
  </SkipNumberUpdater>
);

export default SkipNumber;
