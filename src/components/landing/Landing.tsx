/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useLines } from "../../hooks/useLines";
import { Logo } from "../Logo";
import { WhatWeDo } from "./WhatWeDo";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";
import { LineList } from "./LineList";

const landingStyles = ({
  colors: { background, text },
  font,
  separators
}: Theme) => ({
  page: {
    color: text.primary,
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    padding: "2rem"
  },
  available: {
    color: text.primary,
    fontSize: font.size.normal,
    borderBottom: `1px solid ${separators.color}`,
    marginBottom: "5px"
  },
  lines: {
    marginTop: "20px"
  }
});

export const Landing = () => {
  const style = useStyle(landingStyles);
  const lineNames = useLines();
  return (
    <div css={style.page}>
      <Logo />
      <WhatWeDo />
      <div css={style.lines}>
        <div css={style.available}>Available Lines</div>
        <LineList lineNames={lineNames} />
      </div>
    </div>
  );
};
