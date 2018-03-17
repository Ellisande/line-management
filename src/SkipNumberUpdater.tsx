import * as React from 'react';
import { DataUpdater } from './firebaseHelper';
// import { Queuer } from './Queuer';

export interface Updater {
  (skippedAt: string): void;
}

interface Props {
  path: string;
  children: (updater: Updater) => JSX.Element;
  id: string;
}

class SkipNumberUpdater extends React.Component<Props, {}> {
  render() {
    const { path, children, id } = this.props;
    return (
      <DataUpdater path={`${path}/line/${id}/skippedAt`}>
        {
          (updater: Updater) => children(updater)
        }
      </DataUpdater>
    );
  }
}

export default SkipNumberUpdater;
