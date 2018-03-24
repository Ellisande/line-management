import * as React from 'react';
import { DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';
import QueuerProvider from './QueuerProvider';

interface Props {
  path: string;
  children: (current?: Queuer, id?: string) => JSX.Element;
}

const CurrentQueuerProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={`${path}/current`}>
    {
      (currentNumberId?: string) => (
        currentNumberId ? (
        <QueuerProvider path={path} id={currentNumberId}>
          {queuer => {
            return children(queuer, currentNumberId);
          }}
        </QueuerProvider>) : children(undefined, undefined)
      )
    }
  </DataProvider>
);

export default CurrentQueuerProvider;
