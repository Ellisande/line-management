import * as React from "react";
import { css } from "aphrodite";
import { Theme } from "../styles/theme";
import { Style } from "../styles/ThemeProvider";

interface MarkDoneProps {
  markAsDone: (numberToMarkDone: number) => void;
  pullNextNumber: () => void;
  currentNumber: number;
}

const styleBuilder = ({ font, buttons, colors }: Theme) => ({
  action: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    fontSize: font.size.small,
    color: colors.text.primary,
    backgroundColor: colors.button.primary
  }
});

const MarkDoneAndCallNext: React.SFC<MarkDoneProps> = ({
  markAsDone,
  pullNextNumber,
  currentNumber
}) => {
  const markAndPull = () => {
    markAsDone(currentNumber);
    pullNextNumber();
  };
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <button className={css(styles.action)} onClick={markAndPull}>
          Complete &amp; Call Next
        </button>
      )}
    </Style>
  );
};

export default MarkDoneAndCallNext;
