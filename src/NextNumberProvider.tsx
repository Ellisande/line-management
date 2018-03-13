import * as React from 'react';
import { DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';
import { filter } from 'lodash';

interface Props {
  path: string;
  children: (nextNumber: Queuer) => JSX.Element;
}

const onlyUnserviced = (l: Queuer) => !l.servicedAt;

const NextNumberProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={`${path}/line`}>
    {(value: {}) => {
      const nextNumber: Queuer = filter(value, onlyUnserviced)[0] || {};
      return children(nextNumber);
    }}
  </DataProvider>
);

export default NextNumberProvider;
