import * as React from "react";
import { StyleSheet, css } from "aphrodite";

import Serving from "../presentational/Serving";
import CurrentQueuerProvider from "../providers/CurrentQueuerProvider";
import WaitProvider from "../providers/WaitProvider";

const styles = StyleSheet.create({
  layout: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    ":nth-child(n) * + *": {
      marginTop: "20px"
    }
  }
});

const Dashboard: React.SFC<{}> = () => {
  return (
    <CurrentQueuerProvider>
      {currentQueuer =>
        currentQueuer ? (
          <WaitProvider>
            {waitTime => (
              <div className={css(styles.layout)}>
                <Serving
                  currentNumber={currentQueuer.number}
                  estimatedWait={waitTime}
                />
              </div>
            )}
          </WaitProvider>
        ) : (
          <div>Loading</div>
        )
      }
    </CurrentQueuerProvider>
  );
};

export default Dashboard;
