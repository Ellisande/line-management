import * as React from "react";
import { css } from "aphrodite";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";

const styleBuilder = ({ colors: { text } }: Theme) => ({
  important: {
    color: text.important
  }
});

const Text: React.SFC<{ important: boolean; children: React.ReactNode }> = ({
  important,
  children
}) => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <span className={css(important ? styles.important : undefined)}>
          {children}
        </span>
      )}
    </Style>
  );
};

export { Text };
