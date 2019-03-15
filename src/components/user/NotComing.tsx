/** @jsx jsx */
import { jsx } from "@emotion/core";
import moment from "moment";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";
import { useRemoveFromLine } from "../../hooks/useQueuerUpdater";
import { Queuer } from "../../Queuer";
import { useRemoveSelf } from "../../hooks/useRemoveSelf";
import { useCallback } from "react";
const stylesBuilder = ({ colors, buttons, font }: Theme) => ({
  leaving: {
    fontSize: font.size.normal,
    color: colors.text.primary,
    backgroundColor: colors.button.cancel,
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    marginTop: "10rem"
  }
});

interface Props {
  localQueuer: Queuer;
  onLeave: () => void;
}

export const NotComing: React.SFC<Props> = ({ localQueuer, onLeave }) => {
  const styles = useStyle(stylesBuilder);
  const removeFromLine = useRemoveFromLine(localQueuer.id);
  const removeAll = useCallback(
    time => {
      removeFromLine(time);
      onLeave();
    },
    [onLeave, removeFromLine]
  );
  return (
    <button onClick={() => removeAll(moment())} css={styles.leaving}>
      Give Up My Spot
    </button>
  );
};
