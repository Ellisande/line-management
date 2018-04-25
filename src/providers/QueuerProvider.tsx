import * as React from "react";

import { FirebaseQuery } from "fire-fetch";
import { Queuer } from "../Queuer";

interface Props {
  id: string;
  children: (queuer: Queuer) => JSX.Element;
}

const QueuerProvider: React.SFC<Props> = ({ id, children }) => (
  <FirebaseQuery path={`/line/${id}`} on={true}>
    {(queuer: Queuer) => {
      return children(queuer);
    }}
  </FirebaseQuery>
);

export default QueuerProvider;
