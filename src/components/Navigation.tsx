/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Lock } from "../icons/Lock";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { Link, Route } from "react-router-dom";

const styleBuilder = ({ colors, font }: Theme) => ({
  icon: {
    color: colors.text.important,
    width: "3.5rem",
    height: "3.5rem",
    borderRadius: "30rem",
    backgroundColor: colors.button.secondary,
    padding: "1rem",
    fill: colors.button.primary
  },
  layout: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "1rem"
  }
});

export const Navigation = () => {
  const styles = useStyle(styleBuilder);
  return (
    <Route path="/line/:line_name">
      {({ match }) => (
        <div css={styles.layout}>
          <Link to={`${match && match.url}/options`} css={styles.icon}>
            <Lock />
          </Link>
        </div>
      )}
    </Route>
  );
};
