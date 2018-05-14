import * as React from "react";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";
import { css } from "aphrodite";

interface AcceptNumbersProps {
  onStartAccepting: () => void;
}

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  happyButton: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.primary,
    color: colors.text.primary,
    fontSize: font.size.small
  }
});

const StartAccepting: React.SFC<AcceptNumbersProps> = ({
  onStartAccepting
}) => (
  <Style buildStyles={styleBuilder}>
    {styles => (
      <button onClick={onStartAccepting} className={css(styles.happyButton)}>
        Start Accepting Numbers
      </button>
    )}
  </Style>
);

export { StartAccepting };
