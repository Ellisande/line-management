/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useLineAppender } from "../hooks/useLineAppender";
import { useStyle } from "../theme/useStyle";
import { Theme } from "../theme/theme";
import { useHighestNumber } from "../hooks/useHighestNumber";
import { useCallback } from "react";
import { useAuthenticated } from "../hooks/useAuthenticated";

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  bigButton: {
    fontSize: font.size.large,
    minHeight: "8rem",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.button.primary,
    color: colors.text.primary,
    ...buttons.borderOptions,
    ...buttons.paddingOptions
  }
});

interface Props {
  onDispense: (id: string) => void;
}

export const NumberDispenser: React.SFC<Props> = ({ onDispense }) => {
  const highestNumber = useHighestNumber();
  const addNumber = useLineAppender();
  const styles = useStyle(styleBuilder);
  const userId = useAuthenticated();
  const createAndSet = useCallback(() => {
    if (!userId) {
      return () => {};
    }
    const newQueuer = { number: highestNumber + 1, userId };
    addNumber(newQueuer).then(doc => {
      if (doc && doc.id) {
        onDispense(doc.id);
      }
    });
  }, [highestNumber, addNumber, onDispense, userId]);
  return (
    <button css={styles.bigButton} onClick={createAndSet}>
      Take A Number
    </button>
  );
};
