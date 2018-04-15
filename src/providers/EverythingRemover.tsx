import * as React from 'react';
import { FirebaseRemover } from '../firebaseHelper';

interface Remover {
  (): void;
}

interface Props {
  children: (everythingRemover: Remover) => JSX.Element;
}

const EverythingRemover: React.SFC<Props> = ({ children }) => (
  <FirebaseRemover path="/line">
    {lineRemover => (
      <FirebaseRemover path="/current">
        { currentRemover => {
          const removeEverythingHandler = () => {
            lineRemover();
            currentRemover();
          };
          return children(removeEverythingHandler);
        }}
      </FirebaseRemover>
    )}
  </FirebaseRemover>
);

export default EverythingRemover;
