import * as React from 'react';
import * as moment from 'moment';
import { StyleSheet, css } from 'aphrodite';
import LineCountProvider from '../providers/LineCountProvider';
import LineAppender, { Appender } from '../providers/LineAppender';

const styles = StyleSheet.create({
  big: {
    fontSize: '40px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
  },
});

interface DispenserProps {
  onDispense?: (numberId: string) => void;
}

const NumberDispenser: React.SFC<DispenserProps> = ({ onDispense }) => {
  return (
    <LineAppender onPush={onDispense}>
    {
      (addNumber: Appender) => (
        <LineCountProvider all={true}>
          {
            (lineCount: number) => {
              return (
              <button
                className={css(styles.big)}
                onClick={() => {
                  addNumber({
                    number: lineCount + 1,
                    userId: '1',
                    pulledAt: moment().format(),
                  });
                }}
              >
                Take Number
              </button>);
            }}
        </LineCountProvider>
      )
    }
    </LineAppender>
  );
};

export default NumberDispenser;
