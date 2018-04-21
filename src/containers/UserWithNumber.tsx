import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from '../presentational/EstimatedWait';
import SkipNumber from '../presentational/SkipNumber';
import LeaveLineUpdater from '../providers/LeaveLineUpdater';
import LocalQueuerProvider from '../providers/LocalQueuerProvider';
import WaitProvider from '../providers/WaitProvider';
import NumbersAheadProvider from '../providers/NumbersAheadProvider';

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
  onAcknowledge: () => void;
}

const UserWithNumber: React.SFC<Props> = ({ onAcknowledge }) => {
  return (
    <LocalQueuerProvider path="/minefaire">
      {
        (queuer, id) => queuer && id ? (
          <div>
            <div>Your number is {queuer.number}</div>
            <WaitProvider forNumber={queuer.number}>
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
