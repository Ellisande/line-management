import * as React from 'react';
import { FirebaseQuery } from 'fire-fetch';
import { Queuer } from '../Queuer';
import { map } from 'lodash';

interface Props {
  children: (nextNumber: Queuer, id: string) => JSX.Element;
}

interface QueuerMap {
  [key: string]: Queuer;
}

const onlyUnserviced = (l: Queuer) => !l.servicedAt;
const onlyUnskipped = (l: Queuer) => !l.skippedAt;
const onlyNotLeft = (l: Queuer) => !l.leftAt;

const NextNumberProvider: React.SFC<Props> = ({ children }) => (
  <FirebaseQuery path="/line" on={true}>
    {(allNumbers: QueuerMap) => {
      const validNumbers = map(allNumbers, (num: Queuer, key: string) => ({...num, id: key}))
        .filter(onlyUnserviced).filter(onlyUnskipped).filter(onlyNotLeft);
      const nextNumber = validNumbers[0] ||  {};
      return children(nextNumber, nextNumber.id);
    }}
  </FirebaseQuery>
);

export default NextNumberProvider;
