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

const styleBuilder = ({ colors: { text } }: Theme) => ({
  bigNumber: {
    fontSize: "40px",
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
      marginTop: "10px"
    }
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    ":nth-child(n) > * + *": {
      marginLeft: "7px"
    }
  },
  subtle: {
    fontSize: "10px"
  },
  leaving: {
    fontSize: "8px"
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
            <div className="wait times">
              <AverageNumberTime />
              <WaitProvider>
                {wait => (
                  <div>
                    <div>Current wait is {wait.humanize()}</div>
                    <div>
                      Estimated time to done{" "}
                      {moment()
                        .add(wait)
                        .format("MM-DD hh:mma")}
                    </div>
                  </div>
                )}
              </WaitProvider>
            </div>
            <StartStopNumbers />
            <ResetNumbers onResetNumbers={() => undefined} />
          </div>
        )}
      </Style>
    </Authenticated>
  );
};

export default Manage;
