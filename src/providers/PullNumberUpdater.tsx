import * as React from "react";
import { FirebaseUpdater } from "../firebaseHelper";

export interface Updater {
  (pulledAt: string): void;
}

interface Props {
  id: string;
  children: (updater: Updater) => JSX.Element;
}

class PullNumberUpdater extends React.Component<Props, {}> {
  render() {
    const { children, id } = this.props;
    return (
      <FirebaseUpdater path={`/line/${id}/pulledAt`}>
        {(updater: Updater) => children(updater)}
      </FirebaseUpdater>
    );
  }
}

export default PullNumberUpdater;
