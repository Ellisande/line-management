import * as React from 'react';
import EstimatedWait from './EstimatedWait';
import NumberDispenser from './NumberDispenser';
import AcceptingNumbersProvider from './AcceptingNumbersProvider';
import LocalNumberUpdater from './LocalNumberUpdater';
import WaitProvider from './WaitProvider';

const UserWithoutNumber: React.SFC<{}> = () => {
  return (
    <LocalNumberUpdater path="/minefaire">
    {
      setLocalNumber => (
        <AcceptingNumbersProvider>
        {
          accepting => accepting ? (
            <div>
              <NumberDispenser onDispense={setLocalNumber} />
              <WaitProvider>
                {waitTime => <EstimatedWait waitTime={waitTime} />}
              </WaitProvider>
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
