import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from './EstimatedWait';
import NumberDispenser from './NumberDispenser';
import AcceptingNumbersProvider from './AcceptingNumbersProvider';
import LocalNumberUpdater from './LocalNumberUpdater';

interface Props {
  nextNumber: number;
  waitTime: moment.Duration;
}

const UserWithoutNumber: React.SFC<Props> = ({ nextNumber, waitTime }) => {
  return (
    <LocalNumberUpdater path="/minefaire">
    {
      setLocalNumber => (
        <AcceptingNumbersProvider path="/minefaire">
        {
          accepting => accepting ? (
            <div>
              <NumberDispenser nextNumber={nextNumber} onDispense={setLocalNumber} />
              <EstimatedWait waitTime={waitTime} />
            </div>
          ) : <div>Sorry we are not currently taking numbers</div>
        }
        </AcceptingNumbersProvider>
      )
    }
    </LocalNumberUpdater>
  );
};

export default UserWithoutNumber;
