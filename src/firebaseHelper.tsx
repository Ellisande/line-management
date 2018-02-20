import * as React from 'react';
import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyBUqTyFednozuhg1iv_MUlehTTxg5NAfGE',
  authDomain: 'line-manager.firebaseapp.com',
  databaseURL: 'https://line-manager.firebaseio.com/',
};
firebase.initializeApp(config);

interface DataProps {
  path: string;
  children: (value: {}) => JSX.Element;
}

interface Update {
  updater: Function;
}

interface FirebaseRef {
  ref: firebase.database.Reference;
}

interface DataState extends FirebaseRef {
  value: {};
}

class DataProvider extends React.Component<DataProps, DataState> {
  constructor(props: DataProps) {
    super(props);
    this.state = {
      value: '',
      ref: firebase.database().ref(this.props.path),
    };
  }
  componentDidMount() {
    const updateState = (snapshot: firebase.database.DataSnapshot) => this.setState(() => ({ value: snapshot.val() }));
    this.state.ref.once('value').then(updateState);
    this.state.ref.on('value', updateState);
  }
  render() {
    return this.props.children(this.state.value);
  }
  componentWillUnmount() {
    this.state.ref.off();
  }
}

class DataUpdater extends React.Component<DataProps, FirebaseRef> {
  constructor(props: DataProps) {
    super(props);
    this.state = {
      ref: firebase.database().ref(this.props.path),
    };
  }
  render() {
    return this.props.children(this.state.ref.set);
  }
}

class DataPusher extends React.Component<DataProps, Update> {
  constructor(props: DataProps) {
    super(props);
    const ref = firebase.database().ref(this.props.path);
    const updater = (valueToAdd: {}) => {
      const newRef = ref.push();
      return newRef.set(valueToAdd);
    };
    this.state = {
      updater,
    };
  }
  render() {
    return this.props.children(this.state.updater);
  }
}

export {
  DataProvider,
  DataUpdater,
  DataPusher,
};
