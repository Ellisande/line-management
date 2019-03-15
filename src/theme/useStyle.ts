import { ThemeContext } from "./themeContext";
import { useContext } from "react";
import { Theme } from "./theme";

interface BuildStyles {
  (theme: Theme): any;
}

export const useStyle = (buildStyles: BuildStyles) => {
  const theme = useContext(ThemeContext);
  return buildStyles(theme);
};
