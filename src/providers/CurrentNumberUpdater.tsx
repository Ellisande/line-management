import * as React from "react";
import { FirebaseUpdater } from "../firebaseHelper";

export interface Updater {
  (nextNumber: string): void;
}

interface Props {
  children: (updater: Updater) => JSX.Element;
}

class CurrentQueuerUpdater extends React.Component<Props, {}> {
  render() {
    const { children } = this.props;
    return (
      <FirebaseUpdater path="/current">
        {(updater: Updater) => children(updater)}
      </FirebaseUpdater>
    );
  }
}

export default CurrentQueuerUpdater;
