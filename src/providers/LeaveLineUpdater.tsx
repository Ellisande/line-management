import * as React from "react";
import { FirebaseUpdater } from "../firebaseHelper";
import LocalNumberUpdater from "./LocalNumberUpdater";

export interface FirebaseUpdate {
  (timestamp: string): void;
}

interface Props {
  id: string;
  children: (updater: FirebaseUpdate) => JSX.Element;
}

/*
TODO: Clean up path hardcoding
*/
class LeaveLineUpdater extends React.Component<Props, {}> {
  render() {
    const { children, id } = this.props;
    return (
      <FirebaseUpdater path={`/line/${id}/leftAt`}>
        {(firebaseUpdater: FirebaseUpdate) => (
          <LocalNumberUpdater path="/minefaire">
            {(_, localStorageRemover) => {
              const updater: FirebaseUpdate = timestamp => {
                firebaseUpdater(timestamp);
                localStorageRemover();
              };
              return children(updater);
            }}
          </LocalNumberUpdater>
        )}
      </FirebaseUpdater>
    );
  }
}

export default LeaveLineUpdater;
