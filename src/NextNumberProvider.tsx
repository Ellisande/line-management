import * as React from 'react';
import { DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';
import { map } from 'lodash';

interface Props {
  path: string;
  children: (nextNumber: Queuer, id: string) => JSX.Element;
}

const onlyUnserviced = (l: Queuer) => !l.servicedAt;
const onlyUnskipped = (l: Queuer) => !l.skippedAt;

const NextNumberProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={`${path}/line`} updateOn="value">
    {(allNumbers: {}) => {
      const validNumbers = map(allNumbers, (num: Queuer, key: string) => ({...num, id: key}))
        .filter(onlyUnserviced).filter(onlyUnskipped);
      const nextNumber = validNumbers[0] ||  {};
      console.log(`All numbers ${JSON.stringify(validNumbers)}. Valid ${JSON.stringify(validNumbers)}
      And finally the next is ${JSON.stringify(nextNumber)}. Id is ${nextNumber.id}`);
      return children(nextNumber, nextNumber.id);
    }}
  </DataProvider>
);

export default NextNumberProvider;
