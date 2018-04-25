import * as React from "react";
import { FirebaseUpdater } from "../firebaseHelper";

export interface Updater {
  (skippedAt: string): void;
}

interface Props {
  children: (updater: Updater) => JSX.Element;
  id: string;
}

class SkipNumberUpdater extends React.Component<Props, {}> {
  render() {
    const { children, id } = this.props;
    return (
      <FirebaseUpdater path={`/line/${id}/skippedAt`}>
        {(updater: Updater) => children(updater)}
      </FirebaseUpdater>
    );
  }
}

export default SkipNumberUpdater;
