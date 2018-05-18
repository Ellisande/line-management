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
import { YourNumber } from "../presentational/YourNumber";

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
  refresh?: () => void;
  onAcknowledge: () => void;
}

interface ClassName {
  className?: string;
}

const CallToAction: React.SFC<ClassName> = ({ className, children }) => (
  <div className={className}>{children}</div>
);
const Informational: React.SFC<ClassName> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const stylesBuilder = ({ colors, buttons, font }: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: colors.text.primary
  },
  subtle: {
    fontSize: font.size.small
  },
  leaving: {
    fontSize: font.size.normal,
    color: colors.text.primary,
    backgroundColor: colors.button.cancel,
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    marginTop: "10rem"
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

const NotComing: React.SFC<NotComingProps> = ({ onLeaveQueue, className }) => (
  <button onClick={onLeaveQueue} className={className}>
    Give Up My Spot
  </button>
);

const UserWithNumber: React.SFC<Props> = ({ onAcknowledge, refresh }) => {
  return (
    <Style buildStyles={stylesBuilder}>
      {styles => (
        <LocalQueuerProvider>
          {(userQueuer, id) =>
            userQueuer && id ? (
              <div className={css(styles.layout)}>
                <CallToAction>
                  <YourNumber>{userQueuer.number}</YourNumber>
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
                <Informational className={css(styles.center)}>
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
