/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { useAuthenticated } from "../hooks/useAuthenticated";
import { useSignIn } from "../hooks/useSignIn";
import { Fragment } from "react";
import { NotAuthorized } from "./NotAuthorized";
import { Permissions } from "../Permission";
import { useAuthorized } from "../hooks/usePermissions";

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

interface Props {
  permissions: Permissions[] | Permissions;
  children: React.ReactNode;
}

export const Authorized: React.SFC<Props> = ({ permissions, children }) => {
  const styles = useStyle(styleBuilder);
  const userId = useAuthenticated();
  const permissionsConverted =
    permissions instanceof Array ? permissions : [permissions];
  const hasPermission = useAuthorized(userId, permissionsConverted);
  if (!hasPermission) {
    return (
      <div css={[styles.pageLayout, styles.layout]}>
        <NotAuthorized />
      </div>
    );
  }
  return <Fragment>{children}</Fragment>;
};
