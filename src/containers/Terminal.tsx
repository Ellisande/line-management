import * as React from "react";
import { StyleSheet, css } from "aphrodite";

import AcceptingNumbersProvider from "../providers/AcceptingNumbersProvider";
import NumberDispenser from "./NumberDispenser";
import Serving from "../presentational/Serving";
import WaitProvider from "../providers/WaitProvider";
import CurrentQueuerProvider from "../providers/CurrentQueuerProvider";

const styles = StyleSheet.create({
  layout: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "10rem"
    }
  }
});

const Terminal: React.SFC<{}> = () => {
  return (
    <div className={css(styles.layout)}>
      <AcceptingNumbersProvider>
        {accepting =>
          !accepting ? (
            <div>We are not accepting numbers</div>
          ) : (
            <NumberDispenser onDispense={() => undefined} />
          )
        }
      </AcceptingNumbersProvider>
      <CurrentQueuerProvider>
        {currentQueuer =>
          currentQueuer ? (
            <WaitProvider>
              {waitTime => (
                <Serving
                  currentNumber={currentQueuer.number}
                  estimatedWait={waitTime}
                />
              )}
            </WaitProvider>
          ) : (
            <div>Loading</div>
          )
        }
      </CurrentQueuerProvider>
    </div>
  );
};

export default Terminal;
