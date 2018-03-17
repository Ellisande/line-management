import * as React from 'react';
import { DataProvider } from './firebaseHelper';

interface Props {
  path: string;
  children: (acceptingNumbers: boolean) => JSX.Element;
}

const AcceptingNumbersProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={`${path}/startedAcceptingAt`}>
    {
      startedAcceptingAt => (
        <DataProvider path={`${path}/stoppedAcceptingAt`}>
          {
            stoppedAcceptingAt => {
              const accepting = startedAcceptingAt && !stoppedAcceptingAt;
              return children(accepting);
            }
          }
        </DataProvider>
      )
    }
  </DataProvider>
);

export default AcceptingNumbersProvider;
