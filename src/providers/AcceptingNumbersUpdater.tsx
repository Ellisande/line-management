import * as React from 'react';
import { FirebaseUpdater, FirebaseRemover } from '../firebaseHelper';

export interface Updater {
  (timeStamp: string): void;
}

interface Props {
  children: (startAccepting: Updater, stopAccepting: Updater) => JSX.Element;
}

class AcceptingNumbersUpdater extends React.Component<Props, {}> {
  render() {
    const { children } = this.props;
    return (
      <FirebaseUpdater path="/startedAcceptingAt">
        {
          (startedAcceptingUpdater: Updater) => (
            <FirebaseUpdater path="/stoppedAcceptingAt">
              {
                (stoppedAcceptingAtUpdater: Updater) => (
                  <FirebaseRemover path="/stoppedAcceptingAt">
                    {
                      removeStopped => {
                        const startHandler = (timestamp: string) => {
                          removeStopped();
                          return startedAcceptingUpdater(timestamp);
                        };
                        return children(startHandler, stoppedAcceptingAtUpdater);
                      }
                    }
                  </FirebaseRemover>
                )
              }
            </FirebaseUpdater>
          )
        }
      </FirebaseUpdater>
    );
  }
}

export default AcceptingNumbersUpdater;
