import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from './EstimatedWait';
import NumberDispenser from './NumberDispenser';

interface Props {
  nextNumber: number;
  onDispense: () => void;
  waitTime: moment.Duration;
}

const UserWithoutNumber: React.SFC<Props> = ({ nextNumber, onDispense, waitTime }) => {
  return (
    <div>
      <NumberDispenser nextNumber={nextNumber} onDispense={onDispense} key={1} />
      <EstimatedWait waitTime={waitTime} key={2} />
    </div>
  );
};

export default UserWithoutNumber;
