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
    // TODO: Have to be controlled theme
    fontSize: font.size.normal,
    borderWidth: buttons.borderOptions.borderWidth,
    borderRadius: buttons.borderOptions.borderRadius,
    color: colors.text.primary,
    backgroundColor: colors.button.primary
  }
});

const MarkDone: React.SFC<MarkDoneProps> = ({
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
          Complete
        </button>
      )}
    </Style>
  );
};

export default MarkDone;
