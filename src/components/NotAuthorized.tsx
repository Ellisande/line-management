/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useStyle } from "../theme/useStyle";
import { Theme } from "../theme/theme";

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

export const NotAuthorized: React.FunctionComponent<{}> = () => {
  const styles = useStyle(styleBuilder);
  return (
    <div css={styles.pageLayout}>
      <main>You are not authorized to use this page.</main>
    </div>
  );
};
