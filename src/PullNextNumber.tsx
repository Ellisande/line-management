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
          {
            (nextNumber, id) => nextNumber && id ?
              <button onClick={() => updater(id)}>Pull Number: {nextNumber.number}</button> :
              <button disabled={true}>No available numbers</button>
          }
        </NextNumberProvider>
      )}
    </CurrentNumberUpdater>
  );

export default PullNextNumber;
