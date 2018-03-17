import * as React from 'react';
import * as moment from 'moment';
// import { isEmpty } from 'lodash';
// import { Queuer } from './Queuer';
import CurrentQueuerProvider from './CurrentQueuerProvider';
import SkipNumberUpdater from './SkipNumberUpdater';

interface SkipProps {
  // numberToSkip: number;
  // onSkip: () => void;
}

const SkipNumber: React.SFC<SkipProps> = () => (
  <CurrentQueuerProvider path="/minefaire">
    {
      (queuer, id) => {
        return queuer && id ? (
          <SkipNumberUpdater path="/minefaire" id={id}>
            {onSkip => <button onClick={() => onSkip(moment().format())}>Skip Number {queuer.number}</button>}
          </SkipNumberUpdater>
        ) : <button disabled={true}>No Current Number to Skip</button>;
      }
    }
  </CurrentQueuerProvider>
);

export default SkipNumber;
