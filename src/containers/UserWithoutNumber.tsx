import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

import EstimatedWait from '../presentational/EstimatedWait';
import NumberDispenser from './NumberDispenser';
import AcceptingNumbersProvider from '../providers/AcceptingNumbersProvider';
import LocalNumberUpdater from '../providers/LocalNumberUpdater';
import WaitProvider from '../providers/WaitProvider';
import NumbersAheadProvider from '../providers/NumbersAheadProvider';

const styles = StyleSheet.create({
  bigNumber: {
    fontSize: '40px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
  },
  layout: {
    display: 'flex',
    height: '80vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ':nth-child(n) > * + *': {
      marginTop: '10px',
    }
  },
});

const UserWithoutNumber: React.SFC<{}> = () => {
  return (
    <LocalNumberUpdater path="/minefaire">
    {
      setLocalNumber => (
        <AcceptingNumbersProvider>
        {
          accepting => accepting ? (
            <div className={css(styles.layout)}>
              <NumberDispenser onDispense={setLocalNumber} />
              <WaitProvider>
                {waitTime => <EstimatedWait waitTime={waitTime} />}
              </WaitProvider>
              <NumbersAheadProvider>
                {numbersAhead =>
                  <div>
                    There are {numbersAhead} people in line
                  </div>
                }
              </NumbersAheadProvider>
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
