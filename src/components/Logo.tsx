/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";

const logoStyles = ({ colors, font }: Theme) => ({
  color: colors.text.important,
  fontSize: font.size.xl,
  textAlign: "center",
  lineHeight: 0.8,
  marginBottom: "1rem",
  textShadow: `5px 5px 15px ${colors.text.secondary}`
});

export const Logo: React.SFC<{}> = () => {
  const styles = useStyle(logoStyles);
  return <div css={styles}>Line Management</div>;
};
