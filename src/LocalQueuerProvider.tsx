import * as React from 'react';
import { Queuer } from './Queuer';
import LocalNumberProvider from './LocalNumberProvider';
import QueuerProvider from './QueuerProvider';

interface Props {
  path: string;
  children: (queuer?: Queuer, id?: string) => JSX.Element;
}

const LocalQueuerProvider: React.SFC<Props> = ({ path, children }) => (
  <LocalNumberProvider path={path}>
    {localNumberId => localNumberId ? (
      <QueuerProvider id={localNumberId}>
        {queuer => children(queuer, localNumberId)}
      </QueuerProvider>
    ) : children(undefined, undefined)}
  </LocalNumberProvider>
);

export default LocalQueuerProvider;
