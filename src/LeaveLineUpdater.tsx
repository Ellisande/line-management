import * as React from 'react';
import { DataUpdater } from './firebaseHelper';

export interface Updater {
  (timestamp: string): void;
}

interface Props {
  id: string;
  path: string;
  children: (updater: Updater) => JSX.Element;
}

/*
TODO: This should probably remove the id from localStorage
*/
class LeaveLineUpdater extends React.Component<Props, {}> {
  render() {
    const { path, children, id } = this.props;
    return (
      <DataUpdater path={`${path}/line/${id}/leftAt`}>
        {
          (updater: Updater) => children(updater)
        }
      </DataUpdater>
    );
  }
}

export default LeaveLineUpdater;
