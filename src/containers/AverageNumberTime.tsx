import * as React from "react";
import AverageNumberTimeProvider from "../providers/AverageNumberTimeProvider";
import { Text } from "../presentational/Text";

const AverageNumberTime: React.SFC<{}> = () => (
  <AverageNumberTimeProvider>
    {averageTime => (
      <div>
        Average Serivce Time:{" "}
        <Text important={true}>{averageTime.humanize()}</Text>
      </div>
    )}
  </AverageNumberTimeProvider>
);

export default AverageNumberTime;
