import * as React from "react";

import LineCountProvider from "./LineCountProvider";

interface Props {
  numberToCheck?: number;
  children: (count: number) => JSX.Element;
}

const NumbersAheadProvider: React.SFC<Props> = ({
  children,
  numberToCheck
}) => {
  return (
    <LineCountProvider stopAt={numberToCheck}>
      {(count: number) => children(count)}
    </LineCountProvider>
  );
};

export default NumbersAheadProvider;
