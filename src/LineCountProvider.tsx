import * as React from 'react';
import { DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';
import { filter } from 'lodash';

interface Props {
  path: string;
  children: (lineCount: number) => JSX.Element;
}

const LineCountProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={`${path}/line`}>
    {(numbersInLine: {}) => {
      const notSkipped = filter(numbersInLine, (queuer: Queuer) => !queuer.skippedAt).length;
      return children(notSkipped);
    }}
  </DataProvider>
);

export default LineCountProvider;
