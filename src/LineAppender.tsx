import * as React from 'react';
import { DataPusher } from './firebaseHelper';
import { Queuer } from './Queuer';

export interface Appender {
  (newQueuer: Queuer): void;
}

interface Props {
  path: string;
  children: (appender: Appender) => JSX.Element;
  onPush?: (id: string) => void;
}

class LineAppender extends React.Component<Props, {}> {
  render() {
    const { path, children, onPush } = this.props;
    return (
      <DataPusher path={`${path}/line`} onPush={onPush}>
       {
         (addNumber: Appender) => children(addNumber)
       }
      </DataPusher>
    );
  }
}

export default LineAppender;
