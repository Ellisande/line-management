import * as React from 'react';
import * as firebase from 'firebase';
import { FirebaseRef } from 'fire-fetch';

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
        {
          (ref: firebase.database.Reference) => this.props.children(this.handleUpdate(ref))
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
        {
          (ref: firebase.database.Reference) => this.props.children(this.handleRemove(ref))
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
      {
        (ref: firebase.database.Reference) => this.props.children(this.handlePush(ref))
      }
      </FirebaseRef>
    );
  }
}