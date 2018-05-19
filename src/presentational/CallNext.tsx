import * as React from "react";
import { css } from "aphrodite";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

interface Props {
  onCalledNext: () => void;
  nextNumber: number;
}

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  default: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.primary,
    color: colors.text.primary,
    fontSize: font.size.normal
  }
});

const CallNext: React.SFC<Props> = ({ onCalledNext, nextNumber }) => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <button className={css(styles.default)} onClick={onCalledNext}>
          Call Number {nextNumber}
        </button>
      )}
    </Style>
  );
};

export { CallNext };
