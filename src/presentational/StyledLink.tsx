import * as React from "react";
import { Style } from "../styles/ThemeProvider";
import { Link } from "react-router-dom";
import { Theme } from "../styles/theme";
import { css } from "aphrodite";

const buildStyles = ({ links }: Theme) => ({
  linkStyle: {
    color: links.colors.default,
    textDecoration: links.textDecoration,
    ":visited": {
      color: links.colors.visited
    }
    /* for active links we need do something a little different TODO: Do this later*/
  }
});

class StyledLink extends Link {
  render() {
    return (
      <Style buildStyles={buildStyles}>
        {styles => <Link {...this.props} className={css(styles.linkStyle)} />}
      </Style>
    );
  }
}

export { StyledLink };
