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
  onPush?: (id: string) => void;
}

interface OptionalProviderProps {
  updateOn?: string;
}

interface ProviderProps extends OptionalProviderProps {
  path: string;
  children: (value?: {}, id?: string) => JSX.Element;
}

interface Update {
  updater: Function;
}

interface Remove {
  (): void;
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

interface RemoverProps {
  path: string;
  children: (remover: Remove) => JSX.Element;
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
      ref: firebase.database().ref(props.path),
    };
    this.updateStateValues = this.updateStateValues.bind(this);
  }
  updateStateValues(snapshot: firebase.database.DataSnapshot) {
    this.setState(() => ({ value: snapshot.val(), key: `${snapshot.key}` }));
  }
  buildRef(path: string, updateOn: string): firebase.database.Reference {
    const newRef = firebase.database().ref(path);
    newRef.once('value').then(this.updateStateValues);
    newRef.on(updateOn, this.updateStateValues);
    return newRef;
  }
  componentDidMount() {
    this.setState(() => ({
      ref: this.buildRef(this.props.path, this.props.updateOn || 'value'),
    }));
  }
  componentWillReceiveProps(nextProps: ProviderProps) {
    if (this.props !== nextProps) {
      this.state.ref.off();
      const newRef = this.buildRef(nextProps.path, nextProps.updateOn || 'value');
      this.setState(() => ({
        ref: newRef,
      }));
    }
  }
  render() {
    return this.props.children(this.state.value, this.state.key);
  }
  handleUnmount() {
    this.state.ref.off();
  }
  componentWillUnmount() {
    this.handleUnmount();
  }
}

class CollectionDataProvider extends React.Component<CollectDataProps, DataState> {
  public static defaultProps: OptionalProviderProps = {
    updateOn: 'value'
  };
  constructor(props: CollectDataProps) {
    super(props);
    initialize();
    this.state = {
      value: '',
      key: '',
      ref: firebase.database().ref(props.path).child(props.id),
    };
    this.updateStateValues = this.updateStateValues.bind(this);
  }
  updateStateValues(snapshot: firebase.database.DataSnapshot) {
    this.setState(() => ({ value: snapshot.val(), key: `${snapshot.key}` }));
  }
  buildRef(path: string, id: string, updateOn: string): firebase.database.Reference {
    const newRef = firebase.database().ref(path).child(id);
    newRef.once('value').then(this.updateStateValues);
    newRef.on(updateOn || 'value', this.updateStateValues);
    return newRef;
  }
  componentDidMount() {
    this.setState(() => ({
      ref: this.buildRef(this.props.path, this.props.id, this.props.updateOn || 'value'),
    }));
  }
  componentWillReceiveProps(nextProps: CollectDataProps) {
    if (this.props !== nextProps) {
      this.state.ref.off();
      const newRef = this.buildRef(nextProps.path, nextProps.id, nextProps.updateOn || 'value');
      this.setState(() => ({
        ref: newRef,
      }));
    }
  }
  render() {
    return this.props.children(this.state.value, this.state.key);
  }
  handleUnmount() {
    this.state.ref.off();
  }
  componentWillUnmount() {
    this.handleUnmount();
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

class DataRemover extends React.Component<RemoverProps, Update> {
  render() {
    const ref = firebase.database().ref(this.props.path);
    return this.props.children(ref.remove.bind(ref));
  }
}

class DataPusher extends React.Component<DataProps, Update> {
  constructor(props: DataProps) {
    super(props);
    initialize();
    const ref = firebase.database().ref(props.path);
    const updater = this.buildUpdater(ref, props.onPush);
    this.state = {
      updater,
    };
  }
  buildUpdater(ref: firebase.database.Reference, onPush?: (id: string) => void) {
    return (valueToAdd: {}) => {
      const newRef = ref.push();
      if (newRef.key && onPush) {
        onPush(newRef.key);
      }
      return newRef.set(valueToAdd);
    };
  }
  componentWillReceiveProps(nextProps: DataProps) {
    if (this.props !== nextProps) {
      const ref = firebase.database().ref(nextProps.path);
      const updater = this.buildUpdater(ref, nextProps.onPush);
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
  DataRemover,
};
