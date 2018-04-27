import * as React from "react";
import CurrentQueuerProvider from "../providers/CurrentQueuerProvider";
import SkipNumber from "../presentational/SkipNumber";

const SkipCurrentNumber: React.SFC<{}> = () => (
  <CurrentQueuerProvider>
    {(queuer, id) => {
      return queuer && id ? (
        <SkipNumber idToSkip={id}>Skip</SkipNumber>
      ) : (
        <button disabled={true}>No Current Number to Skip</button>
      );
    }}
  </CurrentQueuerProvider>
);

export default SkipCurrentNumber;
