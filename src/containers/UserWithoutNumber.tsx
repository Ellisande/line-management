import * as React from "react";
import { css } from "aphrodite";

import EstimatedWait from "../presentational/EstimatedWait";
import NumberDispenser from "./NumberDispenser";
import AcceptingNumbersProvider from "../providers/AcceptingNumbersProvider";
import { Updater } from "../providers/LocalNumberUpdater";
import WaitProvider from "../providers/WaitProvider";
import NumbersAheadProvider from "../providers/NumbersAheadProvider";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

interface Props {
  setLocalNumber: Updater;
}

const styleBuilder = ({ colors: { text } }: Theme) => ({
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
    color: text.primary
  }
});

const UserWithoutNumber: React.SFC<Props> = ({ setLocalNumber }) => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
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
                    <div className={css(styles.text)}>
                      There are {numbersAhead} people in line
                    </div>
                  )}
                </NumbersAheadProvider>
              </div>
            ) : (
              <div>Sorry we are not currently taking numbers</div>
            )
          }
        </AcceptingNumbersProvider>
      )}
    </Style>
  );
};

export default UserWithoutNumber;
