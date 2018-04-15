import * as React from 'react';
import CurrentQueuerProvider from '../providers/CurrentQueuerProvider';
import SkipNumber from '../presentational/SkipNumber';

interface SkipProps {
  // numberToSkip: number;
  // onSkip: () => void;
}

const SkipCurrentNumber: React.SFC<SkipProps> = () => (
  <CurrentQueuerProvider>
    {
      (queuer, id) => {
        return queuer && id ? (
          <SkipNumber idToSkip={id}>
            Skip Number {queuer.number}
          </SkipNumber>
        ) : <button disabled={true}>No Current Number to Skip</button>;
      }
    }
  </CurrentQueuerProvider>
);

export default SkipCurrentNumber;
