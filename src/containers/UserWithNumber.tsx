import * as React from "react";
import * as moment from "moment";
import { css } from "aphrodite";

import EstimatedWait from "../presentational/EstimatedWait";
import SkipNumber from "../presentational/SkipNumber";
import LeaveLineUpdater from "../providers/LeaveLineUpdater";
import LocalQueuerProvider from "../providers/LocalQueuerProvider";
import WaitProvider from "../providers/WaitProvider";
import NumbersAheadProvider from "../providers/NumbersAheadProvider";
import NextNumberProvider from "../providers/NextNumberProvider";
import { Theme } from "../styles/theme";
import { Style } from "../styles/ThemeProvider";

interface OnTheWayProps {
  onAcknowledge: () => void;
}

interface NotComingProps {
  className: string;
  onLeaveQueue: () => void;
}

const OnTheWay: React.SFC<OnTheWayProps> = ({ onAcknowledge }) => (
  <button onClick={onAcknowledge}>On the Way</button>
);

interface Props {
  lineName: string;
  refresh?: () => void;
  onAcknowledge: () => void;
}
const CallToAction: React.SFC<{}> = ({ children }) => <div>{children}</div>;
const Informational: React.SFC<{}> = ({ children }) => <div>{children}</div>;

const stylesBuilder = ({ colors, buttons }: Theme) => ({
  bigNumber: {
    fontSize: "70px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    color: colors.text.important
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: colors.text.primary,
    ":nth-child(n) > * + *": {
      marginTop: "10px"
    }
  },
  subtle: {
    fontSize: "10px"
  },
  leaving: {
    fontSize: "8px",
    color: colors.text.primary,
    backgroundColor: colors.button.cancel,
    borderWidth: buttons.borderOptions.borderWidth,
    borderRadius: buttons.borderOptions.borderRadius
  }
});

const NotComing: React.SFC<NotComingProps> = ({ onLeaveQueue, className }) => (
  <button onClick={onLeaveQueue} className={className}>
    Give Up My Spot
  </button>
);

const UserWithNumber: React.SFC<Props> = ({
  onAcknowledge,
  lineName,
  refresh
}) => {
  return (
    <Style buildStyles={stylesBuilder}>
      {styles => (
        <LocalQueuerProvider path={`/${lineName}`}>
          {(userQueuer, id) =>
            userQueuer && id ? (
              <div className={css(styles.layout)}>
                <CallToAction>
                  <div>Your number is:</div>
                  <div className={css(styles.bigNumber)}>
                    {userQueuer.number}
                  </div>
                  <NextNumberProvider>
                    {nextQueuer => {
                      const userIsNext =
                        userQueuer.number === (nextQueuer && nextQueuer.number);
                      return userIsNext ? (
                        <div>
                          <SkipNumber idToSkip={id}>Skip Me</SkipNumber>
                          <OnTheWay onAcknowledge={onAcknowledge} />
                        </div>
                      ) : (
                        <div />
                      );
                    }}
                  </NextNumberProvider>
                </CallToAction>
                <Informational>
                  <WaitProvider forNumber={userQueuer.number}>
                    {waitTime => (
                      <EstimatedWait
                        className={css(styles.subtle)}
                        waitTime={waitTime}
                      />
                    )}
                  </WaitProvider>
                  <NumbersAheadProvider numberToCheck={userQueuer.number}>
                    {numbersAhead => (
                      <div className={css(styles.subtle)}>
                        There are {numbersAhead} people in front of you
                      </div>
                    )}
                  </NumbersAheadProvider>
                </Informational>
                <LeaveLineUpdater id={id}>
                  {notComing => (
                    <NotComing
                      className={css(styles.leaving)}
                      onLeaveQueue={() => {
                        notComing(moment().format());
                        if (refresh) {
                          refresh();
                        }
                      }}
                    />
                  )}
                </LeaveLineUpdater>
              </div>
            ) : (
              <div>You don't have a number yet!</div>
            )
          }
        </LocalQueuerProvider>
      )}
    </Style>
  );
};

export default UserWithNumber;
