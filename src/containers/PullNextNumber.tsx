import * as React from 'react';
import CurrentNumberUpdater from '../providers/CurrentNumberUpdater';
import NextNumberProvider from '../providers/NextNumberProvider';

interface PullNextNumberProps {
  onPullNumber: () => void;
}

const PullNextNumber: React.SFC<PullNextNumberProps> =
  ({ onPullNumber }) => (
    <CurrentNumberUpdater>
      {updater => (
        <NextNumberProvider>
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
