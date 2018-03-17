import * as React from 'react';
import { DataUpdater } from './firebaseHelper';

export interface Updater {
  (servicedAt: string): void;
}

interface Props {
  path: string;
  id: string;
  children: (updater: Updater) => JSX.Element;
}

class ServiceNumberUpdater extends React.Component<Props, {}> {
  render() {
    const { path, children, id } = this.props;
    return (
      <DataUpdater path={`${path}/line/${id}/servicedAt`}>
        {(updater: Updater) => children(updater)}
      </DataUpdater>
    );
  }
}

export default ServiceNumberUpdater;
