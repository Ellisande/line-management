import * as React from 'react';
import { DataProvider } from './firebaseHelper';

interface Props {
  path: string;
  children: (current: number) => JSX.Element;
}

const CurrentNumberProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={`${path}/current`}>
    {(value: number) => {
      return children(value);
    }}
  </DataProvider>
);

export default CurrentNumberProvider;
