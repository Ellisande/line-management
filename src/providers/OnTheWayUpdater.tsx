import * as React from "react";
import { FirebaseUpdater } from "../firebaseHelper";

export interface Updater {
  (onTheWayAt: string): void;
}

interface Props {
  children: (updater: Updater) => JSX.Element;
  id: string;
}

class OnTheWayUpdater extends React.Component<Props, {}> {
  render() {
    const { children, id } = this.props;
    return (
      <FirebaseUpdater path={`/line/${id}/onTheWayAt`}>
        {(updater: Updater) => children(updater)}
      </FirebaseUpdater>
    );
  }
}

export default OnTheWayUpdater;
