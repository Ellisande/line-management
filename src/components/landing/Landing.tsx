/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useLines } from "../../hooks/useLines";
import { Logo } from "../Logo";
import { WhatWeDo } from "./WhatWeDo";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";
import { LineList } from "./LineList";
import { CreateLineButton } from "../create/CreateLineButton";
import { useAuthenticated } from "../../hooks/useAuthenticated";

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
    minHeight: "100vh",
    padding: "2rem"
  },
  available: {
    color: text.primary,
    fontSize: font.size.xl,
    borderBottom: `1px solid ${separators.color}`,
    marginBottom: "5px",
    textAlign: 'center'
  },
  lines: {
    marginTop: "20px",
    ":nth-child(n) > * + *": {
      marginTop: '3rem'
    }
  },
  emptyState: {
    marginTop: '20px',
    fontSize: font.size.large,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    ":nth-child(n) > * + *": {
      marginTop: '3rem'
    }
  },
  center: {
    textAlign: 'center'
  }
});

export const Landing = () => {
  const style = useStyle(landingStyles);
  const lines = useLines();
  const userId = useAuthenticated();
  const myLines = lines.filter(line => line.owner === userId);
  const myLineNames = myLines.map(line => line.name);
  const hasLines = myLineNames.length > 0;
  return (
    <div css={style.page}>
      <Logo />
      <WhatWeDo />
      {
        !hasLines && <div css={style.emptyState}>
          <div css={style.center}>Create a new line to get started</div>
          <CreateLineButton />
        </div>
      }
      {
        hasLines && <div css={style.lines}>
          <CreateLineButton />
          <div>
            <div css={style.available}>Your Lines</div>

            <LineList lineNames={myLineNames} />
          </div>
        </div>
      }
    </div>
  );
};
