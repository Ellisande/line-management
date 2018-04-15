import * as React from 'react';
import { FirebaseQuery } from 'fire-fetch';
import { Queuer } from '../Queuer';
import { filter, sortBy, map } from 'lodash';

interface Children {
  children: (lineCount: number) => JSX.Element;
}

interface StopAtProps extends Children {
  stopAt?: number;
  all?: boolean;
}

const notInLine = (queuer: Queuer) =>
  !queuer.skippedAt && !queuer.leftAt && !queuer.servicedAt;

const upUntilNumber = (stopAt: number) => (queuer: Queuer) => queuer.number < stopAt;

const LineCountProvider: React.SFC<StopAtProps> = ({ children, stopAt, all }) => (
  <FirebaseQuery path="/line" on={true}>
    {(numbersInLine: {}) => {
      const numberValues = map(numbersInLine, i => i);
      if (all) {
        return children(numberValues.length);
      }
      const orderedByNumber = sortBy(numberValues, ['number']);      
      const onlyWaiting = filter(orderedByNumber, notInLine);
      const onlyTillNumber = stopAt ? filter(onlyWaiting, upUntilNumber(stopAt)) : onlyWaiting;
      return children(onlyTillNumber.length);
    }}
  </FirebaseQuery>
);

export default LineCountProvider;
