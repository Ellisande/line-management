import * as React from "react";
import * as moment from "moment";
import { css } from "aphrodite";

import CurrentQueuerProvider from "../providers/CurrentQueuerProvider";
import MarkServedProvider from "../providers/MarkServedProvider";
import CallNextNumberProvider from "../providers/CallNextNumberProvider";
import MarkDone from "../presentational/MarkDone";
import AverageNumberTime from "../containers/AverageNumberTime";
import SkipNumber from "../containers/SkipCurrentNumber";
import AcceptingNumbersProvider from "../providers/AcceptingNumbersProvider";
import AcceptingNumbersUpdater from "../providers/AcceptingNumbersUpdater";
import WaitProvider from "../providers/WaitProvider";
import { Theme } from "../styles/theme";
import { Style } from "../styles/ThemeProvider";
import { StartAccepting } from "../presentational/StartAccepting";
import { StopAccepting } from "../presentational/StopAccepting";
import { ResetNumbers } from "../presentational/ResetNumbers";
import { Authenticated } from "./Authenticated";
import { Text } from "../presentational/Text";

const StartStopNumbers: React.SFC<{}> = () => (
  <AcceptingNumbersUpdater>
    {(startAccepting, stopAccepting) => (
      <AcceptingNumbersProvider>
        {accepting =>
          accepting ? (
            <StopAccepting
              onStopAccepting={() => stopAccepting(moment().format())}
            />
          ) : (
            <StartAccepting
              onStartAccepting={() => startAccepting(moment().format())}
            />
          )
        }
      </AcceptingNumbersProvider>
    )}
  </AcceptingNumbersUpdater>
);

interface Props {
  match: { url: string };
}

const styleBuilder = ({ colors: { text }, font }: Theme) => ({
  bigNumber: {
    fontSize: font.size.huge,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    color: text.important
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "5rem"
    }
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  subtle: {
    fontSize: font.size.small
  },
  leaving: {
    fontSize: font.size.large
  },
  spaceTop: {
    marginTop: "5rem"
  }
});

const Manage: React.SFC<Props> = ({ match }) => {
  return (
    <Authenticated>
      <Style buildStyles={styleBuilder}>
        {styles => (
          <div className={css(styles.layout)}>
            <CurrentQueuerProvider>
              {(currentQueuer, id) =>
                currentQueuer && id ? (
                  <MarkServedProvider>
                    {markCurrentComplete => (
                      <CallNextNumberProvider>
                        {pullNext => (
                          <div>
                            <div className={css(styles.layout)}>
                              Now Serving
                            </div>
                            <div className={css(styles.bigNumber)}>
                              {currentQueuer.number}
                            </div>
                            <div className={css(styles.actions)}>
                              <MarkDone
                                markAsDone={markCurrentComplete}
                                pullNextNumber={pullNext}
                                currentNumber={currentQueuer.number}
                              />
                              <SkipNumber />
                            </div>
                          </div>
                        )}
                      </CallNextNumberProvider>
                    )}
                  </MarkServedProvider>
                ) : (
                  <div>Loading... fix me later</div>
                )
              }
            </CurrentQueuerProvider>
            <div className={css(styles.subtle)}>
              <AverageNumberTime />
              <WaitProvider>
                {wait => (
                  <div>
                    <div>
                      Wait time:{" "}
                      <Text important={true}>
                        {wait.asMinutes().toFixed(2)} minutes
                      </Text>
                    </div>
                    <div>
                      Done at:{" "}
                      <Text important={true}>
                        {moment()
                          .add(wait)
                          .format("MM-DD hh:mma")}
                      </Text>
                    </div>
                  </div>
                )}
              </WaitProvider>
            </div>
            <div className={css(styles.actions, styles.spaceTop)}>
              <StartStopNumbers />
              <ResetNumbers onResetNumbers={() => undefined} />
            </div>
          </div>
        )}
      </Style>
    </Authenticated>
  );
};

export default Manage;
