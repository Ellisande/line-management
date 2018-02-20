import * as React from 'react';
import { DataPusher } from './firebaseHelper';
import { Queuer } from './Queuer';

export interface Appender {
  (newQueuer: Queuer): void;
}

interface Props {
  path: string;
  children: (appender: Appender) => JSX.Element;
}

class LineAppender extends React.Component<Props, {}> {
  render() {
    return (
      <DataPusher path={this.props.path}>
       {
         (addNumber: Appender) => {
           console.log('I made it to the place', this.props.path, addNumber);
           return this.props.children(addNumber);
         }
       }
      </DataPusher>
    );
  }
}

export default LineAppender;
