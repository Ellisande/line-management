import * as React from "react";
import * as moment from "moment";
import { css } from "aphrodite";

import SkipNumberUpdater from "../providers/SkipNumberUpdater";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

interface SkipProps {
  idToSkip: string;
  children: React.ReactNode;
}

const styleBuilder = ({ font, colors, buttons }: Theme) => ({
  action: {
    fontSize: font.size.normal,
    color: colors.text.primary,
    ...buttons.borderOptions,
    backgroundColor: colors.button.secondary
  }
});

const SkipNumber: React.SFC<SkipProps> = ({ children, idToSkip }) => (
  <Style buildStyles={styleBuilder}>
    {styles => (
      <SkipNumberUpdater id={idToSkip}>
        {onSkip => (
          <button
            className={css(styles.action)}
            onClick={() => onSkip(moment().format())}
          >
            {children}
          </button>
        )}
      </SkipNumberUpdater>
    )}
  </Style>
);

export default SkipNumber;
