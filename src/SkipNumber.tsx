import * as React from 'react';

interface SkipProps {
  numberToSkip: number;
  onSkip: () => void;
}

const SkipNumber: React.SFC<SkipProps> = ({ onSkip, numberToSkip }) =>
  <button onClick={onSkip}>Skip Number {numberToSkip}</button>;

export default SkipNumber;
