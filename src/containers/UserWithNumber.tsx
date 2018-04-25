import * as React from 'react';
import * as moment from 'moment';
import { StyleSheet, css } from 'aphrodite';

import EstimatedWait from '../presentational/EstimatedWait';
import SkipNumber from '../presentational/SkipNumber';
import LeaveLineUpdater from '../providers/LeaveLineUpdater';
import LocalQueuerProvider from '../providers/LocalQueuerProvider';
import WaitProvider from '../providers/WaitProvider';
import NumbersAheadProvider from '../providers/NumbersAheadProvider';
import NextNumberProvider from '../providers/NextNumberProvider';

interface OnTheWayProps {
  onAcknowledge: () => void;
}

interface NotComingProps {
  onLeaveQueue: () => void;
}

const OnTheWay: React.SFC<OnTheWayProps> = ({ onAcknowledge }) => <button onClick={onAcknowledge}>On the Way</button>;

interface Props {
  lineName: string;
  onAcknowledge: () => void;
}
const CallToAction: React.SFC<{}> = ({ children }) => <div>{children}</div>;
const Informational: React.SFC<{}> = ({ children }) => <div>{children}</div>;

const styles = StyleSheet.create({
  bigNumber: {
    fontSize: '40px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ':nth-child(n) > * + *': {
      marginTop: '10px',
    }
  },
  subtle: {
    fontSize: '10px',
  },
  leaving: {
    fontSize: '8px',
  }
});

const NotComing: React.SFC<NotComingProps> =
  ({ onLeaveQueue }) => <button onClick={onLeaveQueue} className={css(styles.subtle)}>Give Up My Spot</button>;

const UserWithNumber: React.SFC<Props> = ({ onAcknowledge, lineName }) => {
  return (
    <LocalQueuerProvider path={`/${lineName}`}>
      {
        (userQueuer, id) => userQueuer && id ? (
          <div className={css(styles.layout)}>
            <CallToAction>
              <div>Your number is:</div>
              <div className={css(styles.bigNumber)}>{userQueuer.number}</div>
              <NextNumberProvider>
                {
                  nextQueuer => {
                      const userIsNext = userQueuer.number === (nextQueuer && nextQueuer.number);
                      return  userIsNext ? (
                        <div>
                          <SkipNumber idToSkip={id}>
                            Skip Me
                          </SkipNumber>
                          <OnTheWay onAcknowledge={onAcknowledge}/>
                        </div>
                      ) : <div />;
                  }
                }
              </NextNumberProvider>
            </CallToAction>
            <Informational>
              <WaitProvider forNumber={userQueuer.number}>
                {waitTime => <EstimatedWait className={css(styles.subtle)} waitTime={waitTime} />}
              </WaitProvider>
              <NumbersAheadProvider numberToCheck={userQueuer.number}>
                {numbersAhead =>
                  <div className={css(styles.subtle)}>
                    There are {numbersAhead} people in front of you
                  </div>
                }
              </NumbersAheadProvider>
            </Informational>
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
