import * as React from "react";
import AverageNumberTimeProvider from "../providers/AverageNumberTimeProvider";

const AverageNumberTime: React.SFC<{}> = () => (
  <AverageNumberTimeProvider>
    {averageTime => (
      <div>The average ticket takes {averageTime.humanize()}</div>
    )}
  </AverageNumberTimeProvider>
);

export default AverageNumberTime;
