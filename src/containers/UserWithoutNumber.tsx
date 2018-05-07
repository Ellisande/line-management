import * as React from "react";
import { css } from "aphrodite";

import EstimatedWait from "../presentational/EstimatedWait";
import NumberDispenser from "./NumberDispenser";
import AcceptingNumbersProvider from "../providers/AcceptingNumbersProvider";
import LocalNumberUpdater from "../providers/LocalNumberUpdater";
import WaitProvider from "../providers/WaitProvider";
import NumbersAheadProvider from "../providers/NumbersAheadProvider";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

const styleBuilder = ({ colors: { text }}: Theme) => ({
  layout: {
    display: "flex",
    height: "80vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "10px"
    }
  },
  text: {
    color: text.primary,
  }
});

const UserWithoutNumber: React.SFC<{}> = () => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <LocalNumberUpdater path="/minefaire">
          {setLocalNumber => (
            <AcceptingNumbersProvider>
              {accepting =>
                accepting ? (
                  <div className={css(styles.layout)}>
                    <NumberDispenser onDispense={setLocalNumber} />
                    <WaitProvider>
                      {waitTime => (
                        <EstimatedWait
                          className={css(styles.text)}
                          waitTime={waitTime}
                        />
                      )}
                    </WaitProvider>
                    <NumbersAheadProvider>
                      {numbersAhead => (
                        <div className={css(styles.text)}>There are {numbersAhead} people in line</div>
                      )}
                    </NumbersAheadProvider>
                  </div>
                ) : (
                  <div>Sorry we are not currently taking numbers</div>
                )
              }
            </AcceptingNumbersProvider>
          )}
        </LocalNumberUpdater>
      )}
    </Style>
  );
};

export default UserWithoutNumber;
