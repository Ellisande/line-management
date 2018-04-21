import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as moment from 'moment';
import { StyleSheet, css } from 'aphrodite';
import { FirebaseProvider, RootRef } from 'fire-fetch';

import MarkDone from './presentational/MarkDone';
import Dashboard from './containers/Dashboard';
import UserWithNumber from './containers/UserWithNumber';
import UserWithOutNumber from './containers/UserWithoutNumber';
import SkipNumber from './containers/SkipCurrentNumber';
import CallNextNumberProvider from './providers/CallNextNumberProvider';
import AcceptingNumbersProvider from './providers/AcceptingNumbersProvider';
import AcceptingNumbersUpdater from './providers/AcceptingNumbersUpdater';
import EverythingRemover from './providers/EverythingRemover';
import AverageNumberTime from './containers/AverageNumberTime';
import MarkServedProvider from './providers/MarkServedProvider';
import Terminal from './containers/Terminal';
import config from './firebaseConfig';
import CurrentQueuerProvider from './providers/CurrentQueuerProvider';

interface AcceptNumbersProps {
  onStartAccepting: () => void;
}

interface StopAcceptingNumbersProps {
  onStopAccepting: () => void;
}

interface ResetNumbersProps {
  onResetNumbers: () => void;
}

const StartAccepting: React.SFC<AcceptNumbersProps> =
  ({ onStartAccepting }) => <button onClick={onStartAccepting}>Start Accepting Numbers</button>;

const StopAccepting: React.SFC<StopAcceptingNumbersProps> =
  ({ onStopAccepting }) => <button onClick={onStopAccepting}>Stop Accepting Numbers</button>;

const StartStopNumbers: React.SFC<{}> = () => (
  <AcceptingNumbersUpdater>
    {
      (startAccepting, stopAccepting) => (
      <AcceptingNumbersProvider>
        {
          accepting => accepting ?
          <StopAccepting onStopAccepting={() => stopAccepting(moment().format())} /> :
          <StartAccepting onStartAccepting={() => startAccepting(moment().format())}/>
        }
      </AcceptingNumbersProvider>
    )}
  </AcceptingNumbersUpdater>
);

const ResetNumbers: React.SFC<ResetNumbersProps> = () => (
  <EverythingRemover>
    {removeEverything => <button onClick={removeEverything}>Reset All Numbers</button>}
  </EverythingRemover>
);

const tenMinutes = moment.duration(10, 'minutes');

const linkStyles = StyleSheet.create({
  linkList: {
    display: 'flex',
    width: '80%',
    paddingBottom: '15px',
    ':nth-child(n) > *': {
      flex: 1,
      wordBreak: 'keep-all',
    }
  }
});

class App extends React.Component {
  render() {
    return (
      <FirebaseProvider config={config}>
        <RootRef path="/minefaire">
          <Router>
            <div style={{paddingTop: '20vh', paddingLeft: '10vw'}}>
            <Route
              path="/"
              render={
                () =>
                  <div className={css(linkStyles.linkList)}>
                    <Link to="/user/withNumber">has number</Link>
                    <Link to="/user/withoutNumber">no number</Link>
                    <Link to="/manage">manage</Link>
                    <Link to="terminal">terminal</Link>
                    <Link to="/dashboard">dashboard</Link>
                  </div>
                }
            />
            <Route
              path="/user/withNumber"
              exact={true}
              render={() =>
                <UserWithNumber
                  waitTime={tenMinutes}
                  onSkip={() => undefined}
                  onAcknowledge={() => undefined}
                  onLeaveQueue={() => undefined}
                />
              }
            />
            <Route
              path="/user/withOutNumber"
              exact={true}
              render={() =>
                <UserWithOutNumber />
              }
            />
            <Route
              path="/manage"
              render={() =>
                <div>
                  <CurrentQueuerProvider>
                    {
                      (currentQueuer, id) => currentQueuer && id ? (
                        <MarkServedProvider>
                          {
                            markCurrentComplete => (
                              <CallNextNumberProvider>
                                {
                                  pullNext =>
                                  <MarkDone
                                    markAsDone={markCurrentComplete}
                                    pullNextNumber={pullNext}
                                    currentNumber={currentQueuer.number}
                                  />
                                }
                              </CallNextNumberProvider>
                            )
                          }
                        </MarkServedProvider>
                      ) : <div>Loading... fix me later</div>
                    }
                  </CurrentQueuerProvider>
                  <AverageNumberTime />
                  <SkipNumber />
                  <StartStopNumbers />
                  <ResetNumbers onResetNumbers={() => undefined}/>
                </div>
              }
            />
            <Route
              path="/terminal"
              render={
                () => <Terminal />
              }
            />
            <Route
              path="/dashboard"
              render={() => <Dashboard />}
            />
          </div>
        </Router>
        </RootRef>
      </FirebaseProvider>
    );
  }
}

export default App;
