import * as React from 'react';
import { FirebaseQuery } from 'fire-fetch';
import { Queuer } from './Queuer';
import { filter, sortBy, map } from 'lodash';

interface Props {
  stopAt?: number;
  children: (lineCount: number) => JSX.Element;
}

const notInLine = (queuer: Queuer) =>
  !queuer.skippedAt && !queuer.leftAt && !queuer.servicedAt;

const upUntilNumber = (stopAt: number) => (queuer: Queuer) => queuer.number < stopAt;

const LineCountProvider: React.SFC<Props> = ({ children, stopAt }) => (
  <FirebaseQuery path="/line" on={true}>
    {(numbersInLine: {}) => {
      const numberValues = map(numbersInLine, i => i);
      const orderedByNumber = sortBy(numberValues, ['number']);      
      const onlyWaiting = filter(orderedByNumber, notInLine);
      const onlyTillNumber = stopAt ? filter(onlyWaiting, upUntilNumber(stopAt)) : onlyWaiting;
      return children(onlyTillNumber.length);
    }}
  </FirebaseQuery>
);

export default LineCountProvider;
