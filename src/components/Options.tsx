/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAuthorized } from "../hooks/usePermissions";
import { useAuthenticated } from "../hooks/useAuthenticated";
import { PermissionEnum } from "../Permission";

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
  const userId = useAuthenticated();
  const hasTerminalPermissoin = useAuthorized(userId, PermissionEnum.TERMINAL);
  const hasManagePermission = useAuthorized(userId, PermissionEnum.MANAGE);
  return (
    <ul css={styles.layout}>
      <Link css={[styles.link, styles.user]} to={`${basePath}`}>
        User
      </Link>
      {hasTerminalPermissoin && (
        <Fragment>
          <Link css={[styles.link, styles.utility]} to={`${basePath}/terminal`}>
            Terminal
          </Link>
          <Link
            css={[styles.link, styles.utility]}
            to={`${basePath}/dashboard`}
          >
            Dashboard
          </Link>
        </Fragment>
      )}
      {hasManagePermission && (
        <Fragment>
          <Link css={[styles.link, styles.manage]} to={`${basePath}/manage`}>
            Manage
          </Link>
          <Link
            css={[styles.link, styles.manage]}
            to={`${basePath}/preferences`}
          >
            Preferences
          </Link>
        </Fragment>
      )}
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
