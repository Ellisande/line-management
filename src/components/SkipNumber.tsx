/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useQueuer } from "../hooks/useQueuer";
import { useStyle } from "../theme/useStyle";
import { ReactNode, useCallback } from "react";
import { useSkipNumberUpdater } from "../hooks/useQueuerUpdater";
import moment from "moment";
import { Theme } from "../theme/theme";
import { useNextQueuer } from "../hooks/useNextQueuer";
import { useCurrentQueuer } from "../hooks/useCurrentQueuer";
import { useCurrentUpdater } from "../hooks/useCurrentUpdater";

const styleBuilder = ({ font, colors, buttons }: Theme) => ({
  action: {
    fontSize: font.size.large,
    color: colors.text.primary,
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.secondary
  }
});

export const SkipNumber: React.SFC<{
  queuerId?: string;
  children: ReactNode;
}> = ({ queuerId, children }) => {
  const styles = useStyle(styleBuilder);
  const skip = useSkipNumberUpdater(queuerId);
  const nextQueuer = useNextQueuer();
  const setCurrent = useCurrentUpdater();
  const skipAndSetNext = useCallback(() => {
    if (!nextQueuer) {
      return () => {};
    }
    skip(moment());
    setCurrent(nextQueuer.id);
  }, [nextQueuer]);
  return (
    <button css={styles.action} onClick={skipAndSetNext}>
      {children}
    </button>
  );
};
