import * as React from 'react';
import * as moment from 'moment';
import LineCountProvider from './LineCountProvider';
import LineAppender, { Appender } from './LineAppender';

interface DispenserProps {
  nextNumber: number;
  onDispense: () => void;
}

const NumberDispenser: React.SFC<DispenserProps> = ({ nextNumber, onDispense }) => {
  return (
    <LineAppender path="/minefaire">
    {
      (addNumber: Appender) => (
        <LineCountProvider path="/minefaire">
          {
            (lineCount: number) => {
              return (<button
                onClick={() => {
                  addNumber({
                    number: lineCount + 1,
                    userId: '1',
                    numberPulledAt: moment().format(),
                  });
                }}
              >
                Take Number: {lineCount + 1}
              </button>);
            }}
        </LineCountProvider>
      )
    }
    </LineAppender>
  );
};

export default NumberDispenser;
