import * as React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  action: {
    // TODO: Have to be controlled theme
    fontSize: "20px"
  }
});

interface MarkDoneProps {
  markAsDone: (numberToMarkDone: number) => void;
  pullNextNumber: () => void;
  currentNumber: number;
}

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
    <button className={css(styles.action)} onClick={markAndPull}>
      Complete
    </button>
  );
};

export default MarkDone;
