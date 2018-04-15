import * as React from 'react';
import { FirebaseUpdater } from '../firebaseHelper';

export interface Updater {
  (servicedAt: string): void;
}

interface Props {
  id: string;
  children: (updater: Updater) => JSX.Element;
}

class ServiceNumberUpdater extends React.Component<Props, {}> {
  render() {
    const { children, id } = this.props;
    return (
      <FirebaseUpdater path={`/line/${id}/servicedAt`}>
        {(updater: Updater) => children(updater)}
      </FirebaseUpdater>
    );
  }
}

export default ServiceNumberUpdater;
