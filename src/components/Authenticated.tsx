/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { useAuthenticated } from "../hooks/useAuthenticated";
import { useSignIn } from "../hooks/useSignIn";
import { Fragment } from "react";

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
  children: React.ReactNode;
}

export const Authenticated: React.SFC<Props> = ({ children }) => {
  const styles = useStyle(styleBuilder);
  const userId = useAuthenticated();
  const signIn = useSignIn();
  if (!userId) {
    return (
      <div css={[styles.pageLayout, styles.layout]}>
        <button css={styles.signIn} onClick={signIn}>
          Sign In
        </button>
      </div>
    );
  }
  return <Fragment>{children}</Fragment>;
};
