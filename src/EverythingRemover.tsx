import * as React from 'react';
import { DataRemover } from './firebaseHelper';

interface Remover {
  (): void;
}

interface Props {
  path: string;
  children: (everythingRemover: Remover) => JSX.Element;
}

const EverythingRemover: React.SFC<Props> = ({ path, children }) => (
  <DataRemover path={`${path}/line`}>
    {lineRemover => (
      <DataRemover path={`${path}/current`}>
        { currentRemover => {
          const removeEverythingHandler = () => {
            lineRemover();
            currentRemover();
          };
          return children(removeEverythingHandler);
        }}
      </DataRemover>
    )}
  </DataRemover>
);

export default EverythingRemover;
