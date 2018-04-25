import * as React from "react";
import { FirebaseQuery } from "fire-fetch";

interface Props {
  children: (acceptingNumbers: boolean) => JSX.Element;
}

const AcceptingNumbersProvider: React.SFC<Props> = ({ children }) => (
  <FirebaseQuery path="/startedAcceptingAt" on={true}>
    {(startedAcceptingAt?: string) => (
      <FirebaseQuery path="/stoppedAcceptingAt" on={true}>
        {(stoppedAcceptingAt?: string) => {
          const accepting = Boolean(startedAcceptingAt && !stoppedAcceptingAt);
          return children(accepting);
        }}
      </FirebaseQuery>
    )}
  </FirebaseQuery>
);

export default AcceptingNumbersProvider;
