import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as moment from 'moment';
import { StyleSheet, css } from 'aphrodite';

import EstimatedWait from './EstimatedWait';
import UserWithNumber from './UserWithNumber';
import UserWithOutNumber from './UserWithoutNumber';
import NumberDispenser from './NumberDispenser';
import SkipNumber from './SkipNumber';
import CurrentNumberProvider from './CurrentNumberProvider';
import CurrentNumberUpdater from './CurrentNumberUpdater';
import NextNumberProvider from './NextNumberProvider';

interface ServingProps {
  currentNumber: number;
  estimatedWait: moment.Duration;
}

interface PullNextNumberProps {
  onPullNumber: () => void;
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

const Serving: React.SFC<ServingProps> = ({ estimatedWait }) => {
  return (
    <CurrentNumberProvider path="/minefaire">
      {
        currentNumber => (
          <div>
            <div>Currently Serving: {currentNumber}</div>
            <EstimatedWait waitTime={estimatedWait} />
          </div>
        )
      }

    </CurrentNumberProvider>
  );
};

/*
<CurrentNumberUpdater path="/minefaire">
  {(updater) => <button onClick={() => updater(nextNumber.number)}>Pull Number {nextNumber}</button>}
</CurrentNumberUpdater>
*/
const PullNextNumber: React.SFC<PullNextNumberProps> =
  ({ onPullNumber }) => (
    <CurrentNumberUpdater path="/minefaire">
      {updater => (
        <NextNumberProvider path="/minefaire">
          {nextNumber => <button onClick={() => updater(nextNumber.number)}>Pull Number: {nextNumber.number}</button>}
        </NextNumberProvider>
      )}
    </CurrentNumberUpdater>

  );

const StartAccepting: React.SFC<AcceptNumbersProps> =
  ({ onStartAccepting }) => <button onClick={onStartAccepting}>Start Accepting Numbers</button>;

const StopAccepting: React.SFC<StopAcceptingNumbersProps> =
  ({ onStopAccepting }) => <button onClick={onStopAccepting}>Stop Accepting Numbers</button>;

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
                <SkipNumber onSkip={() => undefined} numberToSkip={1}/>
                <StartAccepting onStartAccepting={() => undefined} />
                <StopAccepting onStopAccepting={() => undefined} />
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
