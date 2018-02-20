import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from './EstimatedWait';
import SkipNumber from './SkipNumber';

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
  userNumber: number;
}

const UserWithNumber: React.SFC<Props> = ({ waitTime, onSkip, onAcknowledge, onLeaveQueue, userNumber }) => {
  return (
    <div>
      <EstimatedWait waitTime={waitTime} />
      <SkipNumber onSkip={onSkip} numberToSkip={userNumber}/>
      <OnTheWay onAcknowledge={onAcknowledge}/>
      <NotComing onLeaveQueue={onLeaveQueue}/>
    </div>
  );
};

export default UserWithNumber;
