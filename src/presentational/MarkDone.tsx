import * as React from "react";

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
    console.log(`I am trying to mark ${currentNumber} as complete`);
    console.log("I am using", markAsDone, pullNextNumber);
    markAsDone(currentNumber);
    pullNextNumber();
  };
  return (
    <button onClick={markAndPull}>Mark {currentNumber} as Complete</button>
  );
};

export default MarkDone;
