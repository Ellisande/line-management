import * as React from "react";
import EverythingRemover from "../providers/EverythingRemover";
import { Theme } from "../styles/theme";
import { Style } from "../styles/ThemeProvider";
import { css } from "aphrodite";

interface ResetNumbersProps {
  onResetNumbers: () => void;
}

const styleBuilder = ({ colors, buttons }: Theme) => ({
  sadButton: {
    ...buttons.borderOptions,
    color: colors.text.primary,
    backgroundColor: colors.button.cancel
  }
});

const ResetNumbers: React.SFC<ResetNumbersProps> = () => (
  <Style buildStyles={styleBuilder}>
    {styles => (
      <EverythingRemover>
        {removeEverything => (
          <button onClick={removeEverything} className={css(styles.sadButton)}>
            Reset All Numbers
          </button>
        )}
      </EverythingRemover>
    )}
  </Style>
);

export { ResetNumbers };
