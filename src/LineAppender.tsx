import * as React from 'react';
import { DataUpdater } from './firebaseHelper';
import { Queuer } from './Queuer';

export interface Appender {
  (newQueuer: Queuer): void;
}

interface Props {
  path: string;
  children: (appender: Appender) => JSX.Element;
}

const LineAppender: React.SFC<Props> = ({ path, children }) => {
  return (
    <DataUpdater path={path}>
     {
       (addNumber: Appender) => children(addNumber)
     }
    </DataUpdater>
  );
};

export default LineAppender;
