import * as React from "react";
import { css } from "aphrodite";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

interface Props {
  children: number;
}

const styleBuilder = ({ colors, font }: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  bigNumber: {
    fontSize: font.size.huge,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    color: colors.text.important
  }
});

const YourNumber: React.SFC<Props> = ({ children }) => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <div className={css(styles.layout)}>
          <div>Your number is:</div>
          <div className={css(styles.bigNumber)}>{children}</div>
        </div>
      )}
    </Style>
  );
};

export { YourNumber };
