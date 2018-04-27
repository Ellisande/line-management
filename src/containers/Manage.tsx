import * as React from "react";
import * as moment from "moment";
import { Route } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";

import CurrentQueuerProvider from "../providers/CurrentQueuerProvider";
import MarkServedProvider from "../providers/MarkServedProvider";
import CallNextNumberProvider from "../providers/CallNextNumberProvider";
import MarkDone from "../presentational/MarkDone";
import AverageNumberTime from "../containers/AverageNumberTime";
import SkipNumber from "../containers/SkipCurrentNumber";
import AcceptingNumbersProvider from "../providers/AcceptingNumbersProvider";
import AcceptingNumbersUpdater from "../providers/AcceptingNumbersUpdater";
import EverythingRemover from "../providers/EverythingRemover";
import Terminal from "./Terminal";
import Dashboard from "./Dashboard";
import WaitProvider from "../providers/WaitProvider";

interface AcceptNumbersProps {
  onStartAccepting: () => void;
}

interface StopAcceptingNumbersProps {
  onStopAccepting: () => void;
}

const StartAccepting: React.SFC<AcceptNumbersProps> = ({
  onStartAccepting
}) => <button onClick={onStartAccepting}>Start Accepting Numbers</button>;

const StopAccepting: React.SFC<StopAcceptingNumbersProps> = ({
  onStopAccepting
}) => <button onClick={onStopAccepting}>Stop Accepting Numbers</button>;

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

interface ResetNumbersProps {
  onResetNumbers: () => void;
}

const ResetNumbers: React.SFC<ResetNumbersProps> = () => (
  <EverythingRemover>
    {removeEverything => (
      <button onClick={removeEverything}>Reset All Numbers</button>
    )}
  </EverythingRemover>
);

interface Props {
  match: { url: string };
}

const styles = StyleSheet.create({
  bigNumber: {
    fontSize: "40px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center"
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
      <Route path={`${match.url}/terminal`} exact={true} component={Terminal} />
      <Route
        path={`${match.url}/dashboard`}
        exact={true}
        component={Dashboard}
      />
    </div>
  );
};

export default Manage;
