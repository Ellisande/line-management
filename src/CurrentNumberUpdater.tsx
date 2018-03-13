import * as React from 'react';
import { DataUpdater } from './firebaseHelper';

export interface Updater {
  (nextNumber: number): void;
}

interface Props {
  path: string;
  children: (updater: Updater) => JSX.Element;
}

class CurrentNumberUpdater extends React.Component<Props, {}> {
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

export default CurrentNumberUpdater;
