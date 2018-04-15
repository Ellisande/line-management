import * as React from 'react';
import * as moment from 'moment';
import LineCountProvider from './LineCountProvider';
import LineAppender, { Appender } from './LineAppender';

interface DispenserProps {
  onDispense?: (numberId: string) => void;
}

const NumberDispenser: React.SFC<DispenserProps> = ({ onDispense }) => {
  return (
    <LineAppender onPush={onDispense}>
    {
      (addNumber: Appender) => (
        <LineCountProvider>
          {
            (lineCount: number) => {
              return (<button
                onClick={() => {
                  addNumber({
                    number: lineCount + 1,
                    userId: '1',
                    pulledAt: moment().format(),
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
