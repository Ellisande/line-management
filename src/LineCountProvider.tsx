import * as React from 'react';
import { DataProvider } from './firebaseHelper';

interface Props {
  path: string;
  children: (lineCount: number) => JSX.Element;
}

const LineCountProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={path}>
    {(value: {}) => {
      const lineCount = Object.keys(value || {}).length;
      return children(lineCount);
    }}
  </DataProvider>
);

export default LineCountProvider;
