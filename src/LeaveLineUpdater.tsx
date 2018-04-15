import * as React from 'react';
import { FirebaseUpdater } from './firebaseHelper';

export interface Updater {
  (timestamp: string): void;
}

interface Props {
  id: string;
  children: (updater: Updater) => JSX.Element;
}

/*
TODO: This should probably remove the id from localStorage
*/
class LeaveLineUpdater extends React.Component<Props, {}> {
  render() {
    const { children, id } = this.props;
    return (
      <FirebaseUpdater path={`/line/${id}/leftAt`}>
        {
          (updater: Updater) => children(updater)
        }
      </FirebaseUpdater>
    );
  }
}

export default LeaveLineUpdater;
