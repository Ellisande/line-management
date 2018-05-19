import * as React from "react";
import { css } from "aphrodite";

import AcceptingNumbersProvider from "../providers/AcceptingNumbersProvider";
import NumberDispenser from "./NumberDispenser";
import Serving from "../presentational/Serving";
import WaitProvider from "../providers/WaitProvider";
import CurrentQueuerProvider from "../providers/CurrentQueuerProvider";
import { YourNumber } from "../presentational/YourNumber";
import { Queuer } from "../Queuer";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  layout: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  done: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.primary,
    fontSize: font.size.huge,
    color: colors.text.primary,
    fontWeight: "bold",
    margin: "2rem"
  },
  hasNumberLayout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  reminder: {
    color: colors.text.primary,
    fontWeight: "bold"
  }
});

interface State {
  takenNumber?: number;
}

class Terminal extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      takenNumber: undefined
    };
    this.handleDispense = this.handleDispense.bind(this);
    this.clearState = this.clearState.bind(this);
  }
  handleDispense(id: string, dispensedNumber: Queuer) {
    this.setState(() => ({
      takenNumber: dispensedNumber.number
    }));
  }
  clearState() {
    this.setState(() => ({ takenNumber: undefined }));
  }
  render() {
    const { takenNumber } = this.state;
    return (
      <Style buildStyles={styleBuilder}>
        {styles => (
          <div className={css(styles.layout)}>
            <AcceptingNumbersProvider>
              {accepting => {
                if (!accepting) {
                  return <div>We are not accepting numbers</div>;
                }
                if (takenNumber) {
                  return (
                    <div className={css(styles.hasNumberLayout)}>
                      <YourNumber>{takenNumber}</YourNumber>
                      <div className={css(styles.reminder)}>
                        Take a picture or write down your number!
                      </div>
                      <button
                        className={css(styles.done)}
                        onClick={this.clearState}
                      >
                        Done
                      </button>
                    </div>
                  );
                }
                return (
                  <div className={css(styles.layout)}>
                    <NumberDispenser onDispense={this.handleDispense} />
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
              }}
            </AcceptingNumbersProvider>
          </div>
        )}
      </Style>
    );
  }
}

export default Terminal;
