import * as React from 'react';
import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyBUqTyFednozuhg1iv_MUlehTTxg5NAfGE',
  authDomain: 'line-manager.firebaseapp.com',
  databaseURL: 'https://line-manager.firebaseio.com/',
};

let initialized = false;
const initialize = () => {
  if (!initialized) {
    firebase.initializeApp(config);
    initialized = true;
  }
};

initialize();

interface DataProps {
  path: string;
  children: (value: {}) => JSX.Element;
}

interface OptionalProviderProps {
  updateOn?: string;
}

interface ProviderProps extends OptionalProviderProps {
  path: string;
  children: (value: {}, id: string) => JSX.Element;
}

interface Update {
  updater: Function;
}

interface FirebaseRef {
  ref: firebase.database.Reference;
}

interface DataState extends FirebaseRef {
  value: {};
  key: string;
}

interface CollectDataProps extends ProviderProps {
  id: string;
}

class DataProvider extends React.Component<ProviderProps, DataState> {
  public static defaultProps: OptionalProviderProps = {
    updateOn: 'value'
  };
  constructor(props: ProviderProps) {
    super(props);
    initialize();
    this.state = {
      value: '',
      key: '',
      ref: firebase.database().ref(this.props.path),
    };
  }
  componentDidMount() {
    const updateState = (snapshot: firebase.database.DataSnapshot) =>
      this.setState(() => ({ value: snapshot.val(), key: `${snapshot.key}` }));
    this.state.ref.once(this.props.updateOn || 'value').then(updateState);
    this.state.ref.on(this.props.updateOn || 'value', updateState);
  }
  componentWillReceiveProps(nextProps: CollectDataProps) {
    if (this.props === nextProps) {
      return;
    }
    this.setState(() => ({
      ref: firebase.database().ref(nextProps.path)
    }));
  }
  render() {
    return this.props.children(this.state.value, this.state.key);
  }
  componentWillUnmount() {
    this.state.ref.off();
  }
}

class CollectionDataProvider extends React.Component<CollectDataProps, DataState> {
  constructor(props: CollectDataProps) {
    super(props);
    initialize();
    this.state = {
      value: '',
      key: '',
      ref: firebase.database().ref(this.props.path).child(this.props.id),
    };
  }
  componentDidMount() {
    const updateState = (snapshot: firebase.database.DataSnapshot) =>
      this.setState(() => ({ value: snapshot.val(), key: `${snapshot.key}` }));
    this.state.ref.once('value').then(updateState);
    this.state.ref.on('value', updateState);
  }
  componentWillReceiveProps(nextProps: CollectDataProps) {
    if (this.props === nextProps) {
      return;
    }
    this.setState(() => ({
      ref: firebase.database().ref(nextProps.path).child(nextProps.id)
    }));
  }
  render() {
    return this.props.children(this.state.value, this.state.key);
  }
  componentWillUnmount() {
    this.state.ref.off();
  }
}

class DataUpdater extends React.Component<DataProps, Update> {
  constructor(props: DataProps) {
    super(props);
    initialize();
  }
  render() {
    const ref = firebase.database().ref(this.props.path);
    const updater = (nextValue: {}) => ref.set(nextValue);
    return this.props.children(updater);
  }
}

class DataPusher extends React.Component<DataProps, Update> {
  constructor(props: DataProps) {
    super(props);
    initialize();
    const ref = firebase.database().ref(this.props.path);
    const updater = (valueToAdd: {}) => {
      const newRef = ref.push();
      return newRef.set(valueToAdd);
    };
    this.state = {
      updater,
    };
  }
  componentWillReceiveProps(nextProps: DataProps) {
    if (this.props !== nextProps) {
      const ref = firebase.database().ref(this.props.path);
      const updater = (valueToAdd: {}) => {
        const newRef = ref.push();
        return newRef.set(valueToAdd);
      };
      this.setState(() => ({ updater }));
    }
  }
  render() {
    return this.props.children(this.state.updater);
  }
}

export {
  DataProvider,
  DataUpdater,
  DataPusher,
  CollectionDataProvider,
};
