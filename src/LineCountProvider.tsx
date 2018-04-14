import * as React from 'react';
import { DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';
import { filter, sortBy, map } from 'lodash';

interface Props {
  path: string;
  stopAt?: number;
  children: (lineCount: number) => JSX.Element;
}

const notInLine = (queuer: Queuer) =>
  !queuer.skippedAt && !queuer.leftAt && !queuer.servicedAt;

const upUntilNumber = (stopAt: number) => (queuer: Queuer) => queuer.number < stopAt;

const LineCountProvider: React.SFC<Props> = ({ path, children, stopAt }) => (
  <DataProvider path={`${path}/line`}>
    {(numbersInLine: {}) => {
      const numberValues = map(numbersInLine, i => i);
      const orderedByNumber = sortBy(numberValues, ['number']);      
      const onlyWaiting = filter(orderedByNumber, notInLine);
      const onlyTillNumber = stopAt ? filter(onlyWaiting, upUntilNumber(stopAt)) : onlyWaiting;
      return children(onlyTillNumber.length);
    }}
  </DataProvider>
);

export default LineCountProvider;
