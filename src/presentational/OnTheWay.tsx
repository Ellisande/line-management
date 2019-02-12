import * as React from "react";
import { css } from "aphrodite";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

interface Props {
  onAcknowledge: () => void;
}

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  hereICome: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.primary,
    fontSize: font.size.large,
    color: colors.text.primary
  }
});

const OnTheWay: React.SFC<Props> = ({ onAcknowledge }) => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <button className={css(styles.hereICome)} onClick={onAcknowledge}>
          On the Way
        </button>
      )}
    </Style>
  );
};

export { OnTheWay };
