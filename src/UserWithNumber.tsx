import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from './EstimatedWait';
import SkipNumber from './SkipNumber';
import LeaveLineUpdater from './LeaveLineUpdater';
import LocalQueuerProvider from './LocalQueuerProvider';

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
    <LocalQueuerProvider path="minefaire">
      {
        (queuer, id) => queuer && id ? (
          <div>
            <div>Your number is {queuer.number}</div>
            <EstimatedWait waitTime={waitTime} />
            <SkipNumber path="/minefaire" idToSkip={id}>
              Skip Me
            </SkipNumber>
            <OnTheWay onAcknowledge={onAcknowledge}/>
            <LeaveLineUpdater path="/minefaire" id={userId}>
              {notComing => <NotComing onLeaveQueue={() => notComing(moment().format())}/>}
            </LeaveLineUpdater>
          </div>
        ) : <div>You don't have a number yet!</div>
      }
    </LocalQueuerProvider>
  );
};

export default UserWithNumber;
