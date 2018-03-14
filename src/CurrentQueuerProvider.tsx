import * as React from 'react';
import { CollectionDataProvider, DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';
import { isEmpty } from 'lodash';

interface Props {
  path: string;
  children: (current: Queuer, id: string) => JSX.Element;
}

const CurrentQueuerProvider: React.SFC<Props> = ({ path, children }) => (
  <DataProvider path={`${path}/current`}>
    {
      (currentNumberId: string) => (
        isEmpty(currentNumberId) ? <div /> : <CollectionDataProvider path={`${path}/line`} id={`${currentNumberId}`}>
          {(queuer: Queuer, id: string) => {
            return children(queuer, id);
          }}
        </CollectionDataProvider>
      )
    }
  </DataProvider>
);

export default CurrentQueuerProvider;
