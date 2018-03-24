import * as React from 'react';

import { CollectionDataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';

interface Props {
  path: string;
  id: string;
  children: (queuer: Queuer) => JSX.Element;
}

const QueuerProvider: React.SFC<Props> = ({ path, id, children }) => (
  <CollectionDataProvider path={`${path}/line`} id={id}>
    {(queuer: Queuer) => {
      return children(queuer);
    }}
  </CollectionDataProvider>
);

export default QueuerProvider;
