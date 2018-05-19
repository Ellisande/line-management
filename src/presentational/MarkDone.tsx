import * as React from "react";
import { css } from "aphrodite";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

interface Props {
  onDone: () => void;
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

const MarkDone: React.SFC<Props> = ({ onDone }) => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <button className={css(styles.default)} onClick={onDone}>
          Mark Done
        </button>
      )}
    </Style>
  );
};

export { MarkDone };
