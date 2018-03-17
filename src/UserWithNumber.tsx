import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from './EstimatedWait';
import SkipNumber from './SkipNumber';
import LeaveLineUpdater from './LeaveLineUpdater';

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
  userId: string;
}

const UserWithNumber: React.SFC<Props> = ({ waitTime, onSkip, onAcknowledge, onLeaveQueue, userId }) => {
  return (
    <div>
      <EstimatedWait waitTime={waitTime} />
      <SkipNumber />
      <OnTheWay onAcknowledge={onAcknowledge}/>
      <LeaveLineUpdater path="/minefaire" id={userId}>
        {notComing => <NotComing onLeaveQueue={() => notComing(moment().format())}/>}
      </LeaveLineUpdater>
    </div>
  );
};

export default UserWithNumber;
