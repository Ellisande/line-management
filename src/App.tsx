import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as moment from 'moment';
import { StyleSheet, css } from 'aphrodite';
// import { merge } from 'lodash';

import EstimatedWait from './EstimatedWait';
import UserWithNumber from './UserWithNumber';
import UserWithOutNumber from './UserWithoutNumber';
import NumberDispenser from './NumberDispenser';
import SkipNumber from './SkipNumber';
import CurrentQueuerProvider from './CurrentQueuerProvider';
import PullNextNumber from './PullNextNumber';
import ServiceNumberUpdater from './ServiceNumberUpdater';
import AcceptingNumbersProvider from './AcceptingNumbersProvider';
import AcceptingNumbersUpdater from './AcceptingNumbersUpdater';

interface ServingProps {
  currentNumber: number;
  estimatedWait: moment.Duration;
}

interface AcceptNumbersProps {
  onStartAccepting: () => void;
}

interface StopAcceptingNumbersProps {
  onStopAccepting: () => void;
}

interface ResetNumbersProps {
  onResetNumbers: () => void;
}

interface MarkServedProps {}

// const noOp = () => { return; };

const Serving: React.SFC<ServingProps> = ({ estimatedWait }) => {
  return (
    <CurrentQueuerProvider path="/minefaire">
      {
        currentQueuer => currentQueuer ? (
          <div>
            <div>Currently Serving: {currentQueuer.number}</div>
            <EstimatedWait waitTime={estimatedWait} />
          </div>
        ) : <div>Not Current Serving</div>
      }
    </CurrentQueuerProvider>
  );
};

const MarkServed: React.SFC<MarkServedProps> = () => (
  <CurrentQueuerProvider path="/minefaire">
    {(queuer, id) => queuer && id ? (
      <ServiceNumberUpdater path="/minefaire" id={id}>
        {updater => (
          <button
            onClick={() => updater(moment().format())}
          >
            Mark {queuer.number} Done
          </button>
        )}
      </ServiceNumberUpdater>
    ) : <button disabled={true}>No current number</button>}
  </CurrentQueuerProvider>
);

const StartAccepting: React.SFC<AcceptNumbersProps> =
  ({ onStartAccepting }) => <button onClick={onStartAccepting}>Start Accepting Numbers</button>;

const StopAccepting: React.SFC<StopAcceptingNumbersProps> =
  ({ onStopAccepting }) => <button onClick={onStopAccepting}>Stop Accepting Numbers</button>;

const StartStopNumbers: React.SFC<{}> = () => (
  <AcceptingNumbersUpdater path="/minefaire">
    {
      (startAccepting, stopAccepting) => (
      <AcceptingNumbersProvider path="/minefaire">
        {
          accepting => accepting ?
          <StopAccepting onStopAccepting={() => stopAccepting(moment().format())} /> :
          <StartAccepting onStartAccepting={() => startAccepting(moment().format())}/>
        }
      </AcceptingNumbersProvider>
    )}
  </AcceptingNumbersUpdater>
);

const ResetNumbers: React.SFC<ResetNumbersProps> =
  ({ onResetNumbers }) => <button onClick={onResetNumbers}>Reset All Numbers</button>;

const tenMinutes = moment.duration(10, 'minutes');

const linkStyles = StyleSheet.create({
  linkList: {
    display: 'flex',
    width: '50%',
    ':nth-child(n) > *': {
      flex: 1,
    }
  }
});

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
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
                userNumber={1}
              />
            }
          />
          <Route
            path="/user/withOutNumber"
            exact={true}
            render={() =>
              <UserWithOutNumber nextNumber={2} onDispense={() => undefined} waitTime={tenMinutes}/>
            }
          />
          <Route
            path="/manage"
            render={() =>
              <div>
                <PullNextNumber onPullNumber={() => undefined} />
                <MarkServed />
                <SkipNumber />
                <StartStopNumbers />
                <ResetNumbers onResetNumbers={() => undefined} />
              </div>
            }
          />
          <Route
            path="/terminal"
            render={
              () => (
                <div>
                  <NumberDispenser nextNumber={10} onDispense={() => undefined} />
                  <Serving currentNumber={3} estimatedWait={moment.duration(10, 'minutes')} />
                </div>
              )
            }
          />
          <Route
            path="/dashboard"
            render={() => <Serving  currentNumber={3} estimatedWait={moment.duration(10, 'minutes')} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
