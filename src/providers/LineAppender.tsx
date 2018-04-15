import * as React from 'react';
import { FirebasePusher } from '../firebaseHelper';
import { Queuer } from '../Queuer';

export interface Appender {
  (newQueuer: Queuer): void;
}

interface Props {
  children: (appender: Appender) => JSX.Element;
  onPush?: (id: string) => void;
}

class LineAppender extends React.Component<Props, {}> {
  render() {
    const { children, onPush } = this.props;
    return (
      <FirebasePusher path="/line" onPush={onPush}>
       {
         (addNumber: Appender) => children(addNumber)
       }
      </FirebasePusher>
    );
  }
}

export default LineAppender;
