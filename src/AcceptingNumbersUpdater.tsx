import * as React from 'react';
import { DataUpdater, DataRemover } from './firebaseHelper';
// import { Queuer } from './Queuer';

export interface Updater {
  (timeStamp: string): void;
}

interface Props {
  path: string;
  children: (startAccepting: Updater, stopAccepting: Updater) => JSX.Element;
}

class AcceptingNumbersUpdater extends React.Component<Props, {}> {
  render() {
    const { path, children } = this.props;
    return (
      <DataUpdater path={`${path}/startedAcceptingAt`}>
        {
          (startedAcceptingUpdater: Updater) => (
            <DataUpdater path={`${path}/stoppedAcceptingAt`}>
              {
                (stoppedAcceptingAtUpdater: Updater) => (
                  <DataRemover path={`${path}/stoppedAcceptingAt`}>
                    {
                      (removeStopped: () => void) => {
                        const startHandler = (timestamp: string) => {
                          removeStopped();
                          return startedAcceptingUpdater(timestamp);
                        };
                        return children(startHandler, stoppedAcceptingAtUpdater);
                      }
                    }
                  </DataRemover>
                )
              }
            </DataUpdater>
          )
        }
      </DataUpdater>
    );
  }
}

export default AcceptingNumbersUpdater;
