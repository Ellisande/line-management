import * as React from 'react';
import CurrentNumberUpdater from './CurrentNumberUpdater';
import NextNumberProvider from './NextNumberProvider';

interface PullNextNumberProps {
  onPullNumber: () => void;
}

const PullNextNumber: React.SFC<PullNextNumberProps> =
  ({ onPullNumber }) => (
    <CurrentNumberUpdater path="/minefaire">
      {updater => (
        <NextNumberProvider path="/minefaire">
          {nextNumber => <button onClick={() => updater(nextNumber.number)}>Pull Number: {nextNumber.number}</button>}
        </NextNumberProvider>
      )}
    </CurrentNumberUpdater>
  );

export default PullNextNumber;
