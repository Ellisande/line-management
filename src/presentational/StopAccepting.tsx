import * as React from "react";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";
import { css } from "aphrodite";

interface StopAcceptingNumbersProps {
  onStopAccepting: () => void;
}

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  sadButton: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.cancel,
    color: colors.text.primary,
    fontSize: font.size.normal
  }
});

const StopAccepting: React.SFC<StopAcceptingNumbersProps> = ({
  onStopAccepting
}) => (
  <Style buildStyles={styleBuilder}>
    {styles => (
      <button onClick={onStopAccepting} className={css(styles.sadButton)}>
        Stop Accepting Numbers
      </button>
    )}
  </Style>
);

export { StopAccepting };
