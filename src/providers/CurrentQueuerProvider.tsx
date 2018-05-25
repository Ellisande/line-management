import * as React from "react";
import { FirebaseQuery } from "fire-fetch";
import { Queuer } from "../Queuer";
import QueuerProvider from "./QueuerProvider";

interface Props {
  children: (current?: Queuer, id?: string) => JSX.Element;
}

const CurrentQueuerProvider: React.SFC<Props> = ({ children }) => (
  <FirebaseQuery path="/current" on={true}>
    {(currentNumberId?: string) => {
      console.log(`I am fetching the current number ${currentNumberId}`);
      return currentNumberId ? (
        <QueuerProvider id={currentNumberId}>
          {queuer => {
            console.log(
              `I am fetching the current queuer and the number is`,
              queuer
            );
            return children(queuer, currentNumberId);
          }}
        </QueuerProvider>
      ) : (
        children(undefined, undefined)
      );
    }}
  </FirebaseQuery>
);

export default CurrentQueuerProvider;
