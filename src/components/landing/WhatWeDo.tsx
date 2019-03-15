/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";

const whatWeDoStyles = ({ colors, font }: Theme) => ({
  color: colors.text.secondary,
  fontSize: font.size.small,
  textAlign: "center"
});

export const WhatWeDo: React.SFC<{}> = () => {
  const styles = useStyle(whatWeDoStyles);
  return (
    <div css={styles}>
      <p>You might have to wait, but you don't need to stand around. </p>
      <p>Take a number and we'll tell you when its your turn.</p>
    </div>
  );
};
