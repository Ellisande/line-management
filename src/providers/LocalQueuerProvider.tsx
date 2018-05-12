import * as React from "react";
import { Queuer } from "../Queuer";
import LocalNumberProvider from "./LocalNumberProvider";
import QueuerProvider from "./QueuerProvider";

interface Props {
  children: (queuer?: Queuer, id?: string, refresh?: () => void) => JSX.Element;
}

// TODO: Use library that will notify us when local storage changes
const LocalQueuerProvider: React.SFC<Props> = ({ children }) => (
  <LocalNumberProvider>
    {(localNumberId, refresh) =>
      localNumberId ? (
        <QueuerProvider id={localNumberId}>
          {queuer => children(queuer, localNumberId, refresh)}
        </QueuerProvider>
      ) : (
        children(undefined, undefined, refresh)
      )
    }
  </LocalNumberProvider>
);

export default LocalQueuerProvider;
