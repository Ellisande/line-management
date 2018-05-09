import * as React from "react";
import { Style } from "../styles/ThemeProvider";
import { css } from "aphrodite";
import { Theme } from "../styles/theme";

interface FilterProps {
  onFilter: (filterTerm: string) => void;
}

const filterStyles = ({ font, buttons }: Theme) => ({
  inputGroup: {
    border: "0"
  },
  label: {
    display: "none"
  },
  input: {
    ...buttons.borderOptions,
    fontSize: font.size.large,
    textAlign: "center"
  }
});

const FilterLines: React.SFC<FilterProps> = () => (
  <Style buildStyles={filterStyles}>
    {styles => (
      <fieldset className={css(styles.inputGroup)}>
        <label className={css(styles.label)}>Type to search for a line</label>
        <input className={css(styles.input)} placeholder="Find a line" />
      </fieldset>
    )}
  </Style>
);

export { FilterLines };
