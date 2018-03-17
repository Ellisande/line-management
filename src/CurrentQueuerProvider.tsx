import * as React from 'react';
import { CollectionDataProvider, DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';

interface Props {
  path: string;
  children: (current?: Queuer, id?: string) => JSX.Element;
}

const CurrentQueuerProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={`${path}/current`}>
    {
      (currentNumberId?: string) => (
        currentNumberId ? (
        <CollectionDataProvider path={`${path}/line`} id={currentNumberId}>
          {(queuer: Queuer, id: string) => {
            return children(queuer, id);
          }}
        </CollectionDataProvider>) : children(undefined, undefined)
      )
    }
  </DataProvider>
);

export default CurrentQueuerProvider;
