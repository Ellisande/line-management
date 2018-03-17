import * as React from 'react';
import CurrentNumberUpdater from './CurrentNumberUpdater';
import NextNumberProvider from './NextNumberProvider';
import { Queuer } from './Queuer';

interface PullNextNumberProps {
  onPullNumber: () => void;
}

const PullNextNumber: React.SFC<PullNextNumberProps> =
  ({ onPullNumber }) => (
    <CurrentNumberUpdater path="/minefaire">
      {updater => (
        <NextNumberProvider path="/minefaire">
          {
            (nextNumber: Queuer, id: string) => {
              console.log(`The next number happened and it is ${JSON.stringify(nextNumber)} with id ${id}`);
              return <button onClick={() => updater(`${nextNumber.id}`)}>Pull Number: {nextNumber.number}</button>;
            }
          }
        </NextNumberProvider>
      )}
    </CurrentNumberUpdater>
  );

export default PullNextNumber;
