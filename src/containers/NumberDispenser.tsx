import * as React from "react";
import * as moment from "moment";
import { css } from "aphrodite";
import LineCountProvider from "../providers/LineCountProvider";
import LineAppender, { Appender } from "../providers/LineAppender";
import { Theme } from "../styles/theme";
import { Style } from "../styles/ThemeProvider";

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  bigButton: {
    fontSize: font.size.large,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.button.primary,
    color: colors.text.primary,
    ...buttons.borderOptions,
    ...buttons.paddingOptions
  }
});

interface DispenserProps {
  onDispense?: (numberId: string) => void;
}

const NumberDispenser: React.SFC<DispenserProps> = ({ onDispense }) => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <LineAppender onPush={onDispense}>
          {(addNumber: Appender) => (
            <LineCountProvider all={true}>
              {(lineCount: number) => {
                return (
                  <button
                    className={css(styles.bigButton)}
                    onClick={() => {
                      addNumber({
                        number: lineCount + 1,
                        userId: "1",
                        pulledAt: moment().format()
                      });
                    }}
                  >
                    Take A Number
                  </button>
                );
              }}
            </LineCountProvider>
          )}
        </LineAppender>
      )}
    </Style>
  );
};

export default NumberDispenser;
