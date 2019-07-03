/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { Link, RouteComponentProps } from "react-router-dom";
import { Authenticated } from "./Authenticated";

const listStyleBuilder = ({ colors, font, buttons }: Theme) => ({
  layout: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  link: {
    fontSize: font.size.large,
    color: colors.text.primary,
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    cursor: "pointer",
    textDecoration: "none"
  },
  user: {
    backgroundColor: colors.button.primary
  },
  utility: {
    backgroundColor: colors.button.secondary
  },
  manage: {
    backgroundColor: colors.button.cancel
  }
});

const LinkList: React.SFC<{ basePath: string }> = ({ basePath }) => {
  const styles = useStyle(listStyleBuilder);
  return (
    <ul css={styles.layout}>
      <Link css={[styles.link, styles.user]} to={`${basePath}`}>
        User
      </Link>
      <Link css={[styles.link, styles.utility]} to={`${basePath}/terminal`}>
        Terminal
      </Link>
      <Link css={[styles.link, styles.utility]} to={`${basePath}/dashboard`}>
        Dashboard
      </Link>
      <Link css={[styles.link, styles.manage]} to={`${basePath}/manage`}>
        Manage
      </Link>
      <Link css={[styles.link, styles.manage]} to={`${basePath}/preferences`}>
        Preferences
      </Link>
    </ul>
  );
};

const styleBuilder = ({
  colors: { background, text, button },
  font,
  buttons
}: Theme) => ({
  pageLayout: {
    backgroundColor: background,
    minHeight: "100vh",
    color: text.primary,
    fontSize: font.size.normal,
    display: "flex"
  },
  layout: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  signIn: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    color: text.primary,
    backgroundColor: button.primary,
    fontSize: font.size.large
  }
});

export const Options: React.SFC<RouteComponentProps> = ({ match }) => {
  const styles = useStyle(styleBuilder);
  const baseUrl = match && match.url.replace(/\/options\/?/, "");
  return (
    // <Authenticated>
    <div css={styles.pageLayout}>
      <LinkList basePath={baseUrl} />
    </div>
    // </Authenticated>
  );
};
