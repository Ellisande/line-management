import * as React from 'react';
import { DataUpdater } from './firebaseHelper';
// import { Queuer } from './Queuer';

export interface Updater {
  (nextNumber: string): void;
}

interface Props {
  path: string;
  children: (updater: Updater) => JSX.Element;
}

class CurrentQueuerUpdater extends React.Component<Props, {}> {
  render() {
    const { path, children } = this.props;
    return (
      <DataUpdater path={`${path}/current`}>
        {
          (updater: Updater) => children(updater)
        }
      </DataUpdater>
    );
  }
}

export default CurrentQueuerUpdater;
