/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useStyle } from "../theme/useStyle";
import { Theme } from "../theme/theme";

const styleBuilder = ({ colors: { text } }: Theme) => ({
  layout: {
    display: "flex",
    height: "80vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    ":nth-child(n) > * + *": {
      marginTop: "10rem"
    }
  },
  text: {
    color: text.primary,
    textAlign: "center"
  }
});

export const NotAccepting = () => {
  const style = useStyle(styleBuilder);
  return (
    <div css={[style.layout, style.text]}>
      Sorry we are not currently taking numbers
    </div>
  );
};
