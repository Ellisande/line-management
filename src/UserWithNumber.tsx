import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from './EstimatedWait';
import SkipNumber from './SkipNumber';
import LeaveLineUpdater from './LeaveLineUpdater';
import LocalQueuerProvider from './LocalQueuerProvider';
import WaitProvider from './WaitProvider';
import NumbersAheadProvider from './NumbersAheadProvider';

interface OnTheWayProps {
  onAcknowledge: () => void;
}

interface NotComingProps {
  onLeaveQueue: () => void;
}

const OnTheWay: React.SFC<OnTheWayProps> = ({ onAcknowledge }) => <button onClick={onAcknowledge}>On the Way</button>;

const NotComing: React.SFC<NotComingProps> =
  ({ onLeaveQueue }) => <button onClick={onLeaveQueue}>Give Up My Spot</button>;

interface Props {
  waitTime: moment.Duration;
  onSkip: () => void;
  onAcknowledge: () => void;
  onLeaveQueue: () => void;
}

const UserWithNumber: React.SFC<Props> = ({ onSkip, onAcknowledge, onLeaveQueue }) => {
  return (
    <LocalQueuerProvider path="/minefaire">
      {
        (queuer, id) => queuer && id ? (
          <div>
            <div>Your number is {queuer.number}</div>
            <WaitProvider waitTimeFor={queuer.number}>
              {waitTime => <EstimatedWait waitTime={waitTime} />}
            </WaitProvider>
            <NumbersAheadProvider numberToCheck={queuer.number}>
              {numbersAhead => <div>There are {numbersAhead} people in front of you</div>}
            </NumbersAheadProvider>
            <SkipNumber idToSkip={id}>
              Skip Me
            </SkipNumber>
            <OnTheWay onAcknowledge={onAcknowledge}/>
            <LeaveLineUpdater id={id}>
              {notComing => <NotComing onLeaveQueue={() => notComing(moment().format())}/>}
            </LeaveLineUpdater>
          </div>
        ) : <div>You don't have a number yet!</div>
      }
    </LocalQueuerProvider>
  );
};

export default UserWithNumber;
