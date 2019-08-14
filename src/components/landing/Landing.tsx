/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useManagedLines, useActiveLines } from "../../hooks/useLines";
import { Logo } from "../Logo";
import { WhatWeDo } from "./WhatWeDo";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";
import { LineList } from "./LineList";
import { CreateLineButton } from "../create/CreateLineButton";
import { useAuthenticated } from "../../hooks/useAuthenticated";
import { useAuthorized } from "../../hooks/usePermissions";
import { Permissions } from "../../Permission";

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
    textAlign: "center"
  },
  lines: {
    marginTop: "20px",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  emptyState: {
    marginTop: "20px",
    fontSize: font.size.large,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  center: {
    textAlign: "center"
  }
});

export const Landing = () => {
  const style = useStyle(landingStyles);
  const userId = useAuthenticated();
  const myManagedLines = useManagedLines(userId);
  const myManagedLineNames = myManagedLines.map(line => line.name);

  const myActiveLines = useActiveLines(userId);
  const myActiveLineNames = myActiveLines.map(line => line.name);

  const myLineNames = [...myManagedLineNames, ...myActiveLineNames]
    .sort()
    .reverse();

  const hasLines = myLineNames.length > 0;
  const canCreate =
    useAuthorized(userId, Permissions.LINE_CREATE) && myManagedLines.length < 3;

  return (
    <div css={style.page}>
      <Logo />
      <WhatWeDo />
      {!hasLines && canCreate && (
        <div css={style.emptyState}>
          <div css={style.center}>Create a new line to get started</div>
          <CreateLineButton />
        </div>
      )}
      {hasLines && (
        <div css={style.lines}>
          {canCreate && <CreateLineButton />}
          <div>
            <div css={style.available}>Your Lines</div>

            <LineList lineNames={myLineNames} />
          </div>
        </div>
      )}
    </div>
  );
};
