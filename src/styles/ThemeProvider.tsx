import * as React from "react";
import { StyleSheet, StyleDeclaration } from "aphrodite";

import { defaultTheme, Theme } from "./theme";

const ThemeContext = React.createContext(defaultTheme);

const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

interface StyleProps {
  buildStyles: (theme: Theme) => {};
  children: (styles: StyleDeclaration) => JSX.Element;
}

const Style: React.SFC<StyleProps> = ({ buildStyles, children }) => {
  return (
    <ThemeConsumer>
      {theme => {
        const styles = StyleSheet.create(buildStyles(theme));
        return children(styles);
      }}
    </ThemeConsumer>
  );
};

export { ThemeProvider, ThemeConsumer, Style };
