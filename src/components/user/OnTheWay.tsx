/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";
import { useOnTheWayUpdater } from "../../hooks/useQueuerUpdater";
import { useLocalQueuer } from "../../hooks/useLocalQueuer";
import moment from "moment";

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  hereICome: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.primary,
    fontSize: font.size.large,
    color: colors.text.primary
  }
});

export const OnTheWay = () => {
  const styles = useStyle(styleBuilder);
  const { localQueuerId } = useLocalQueuer();
  const updater = useOnTheWayUpdater(localQueuerId);
  return (
    <button css={styles.hereICome} onClick={() => updater(moment())}>
      On the Way
    </button>
  );
};
