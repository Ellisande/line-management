import * as React from "react";
import * as firebase from "firebase";
import { FirebaseRef } from "fire-fetch";

interface Updater {
  (newValue: {}): void;
}

interface Remover {
  (): void;
}

interface Pusher {
  (newValue: {}): void;
}

interface RemoverProps {
  path: string;
  children: (remover: Remover) => JSX.Element;
}

interface UpdaterProps {
  path: string;
  children: (updater: Updater) => JSX.Element;
  onPush?: (id: string) => void;
}

interface PusherProps {
  path: string;
  children: (pusher: Pusher) => JSX.Element;
  onPush?: (id: string) => void;
}

export class FirebaseUpdater extends React.Component<UpdaterProps, {}> {
  handleUpdate(ref: firebase.database.Reference) {
    return (newValue: {}) => ref.set(newValue);
  }
  render() {
    return (
      <FirebaseRef path={this.props.path}>
        {(ref: firebase.database.Reference) =>
          this.props.children(this.handleUpdate(ref))
        }
      </FirebaseRef>
    );
  }
}

export class FirebaseRemover extends React.Component<RemoverProps, {}> {
  handleRemove(ref: firebase.database.Reference) {
    return () => ref.remove();
  }
  render() {
    return (
      <FirebaseRef path={this.props.path}>
        {(ref: firebase.database.Reference) =>
          this.props.children(this.handleRemove(ref))
        }
      </FirebaseRef>
    );
  }
}

export class FirebasePusher extends React.Component<PusherProps, {}> {
  handlePush(collectionRef: firebase.database.Reference) {
    return (valueToPush: {}) => {
      const newRef = collectionRef.push();
      if (newRef.key && this.props.onPush) {
        this.props.onPush(newRef.key);
      }
      newRef.set(valueToPush);
    };
  }
  render() {
    return (
      <FirebaseRef path={this.props.path}>
        {(ref: firebase.database.Reference) =>
          this.props.children(this.handlePush(ref))
        }
      </FirebaseRef>
    );
  }
}

interface ListProps {
  listPath: string;
  childId?: string;
  children: (list?: {}) => JSX.Element;
  rootPath: string;
  fbapp: firebase.app.App;
}

interface ListState {
  value?: {};
  loading: boolean;
}

export class FirebaseList extends React.Component<ListProps, ListState> {
  state = {
    value: undefined,
    loading: true
  };

  getReference() {
    const { listPath, fbapp, rootPath } = this.props;
    return fbapp.database().ref(`${rootPath}/${listPath}`);
  }

  buildQuery() {
    const { childId } = this.props;
    const ref = this.getReference();
    ref.once("value", snapshot => {
      if (snapshot) {
        const rootVal = snapshot.val();
        const updatedVal = childId ? rootVal[childId] : rootVal;
        this.setState(() => ({ value: updatedVal, loading: false }));
      }
    });
    ref.on("child_changed", snapshot => {
      if (snapshot) {
        const rootVal = snapshot.val();
        const updatedVal = childId ? rootVal[childId] : rootVal;
        this.setState(() => ({ updatedVal, loading: false }));
      }
    });
  }

  componentDidMount() {
    this.buildQuery();
  }

  componentWillUnmount() {
    this.getReference().off();
  }

  render() {
    const { children } = this.props;

    const value = this.state.value ? this.state.value : {};

    return children(value);
  }
}
