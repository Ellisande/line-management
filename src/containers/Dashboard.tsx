import * as React from "react";
import { css } from "aphrodite";

import Serving from "../presentational/Serving";
import CurrentQueuerProvider from "../providers/CurrentQueuerProvider";
import WaitProvider from "../providers/WaitProvider";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

const styleBuilder = ({ colors: { text } }: Theme) => ({
  layout: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    color: text.primary,
    ":nth-child(n) * + *": {
      marginTop: "20px"
    }
  }
});

const Dashboard: React.SFC<{}> = () => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
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
      )}
    </Style>
  );
};

export default Dashboard;
