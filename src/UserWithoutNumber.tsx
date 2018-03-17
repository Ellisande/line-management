import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from './EstimatedWait';
import NumberDispenser from './NumberDispenser';
import AcceptingNumbersProvider from './AcceptingNumbersProvider';

interface Props {
  nextNumber: number;
  onDispense: () => void;
  waitTime: moment.Duration;
}

const UserWithoutNumber: React.SFC<Props> = ({ nextNumber, onDispense, waitTime }) => {
  return (
    <AcceptingNumbersProvider path="/minefaire">
      {
        accepting => accepting ? (
        <div>
          <NumberDispenser nextNumber={nextNumber} onDispense={onDispense} key={1} />
          <EstimatedWait waitTime={waitTime} key={2} />
        </div>
      ) : <div>Sorry we are not currently taking numbers</div>}
    </AcceptingNumbersProvider>
  );
};

export default UserWithoutNumber;
