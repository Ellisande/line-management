import * as React from "react";
import * as moment from "moment";
import { isEmpty, filter, map } from "lodash";
import { FirebaseQuery } from "fire-fetch";
import { Queuer } from "../Queuer";

interface Props {
  children: (averageTime: moment.Duration) => JSX.Element;
}

interface QueuerMap {
  [key: string]: Queuer;
}

const pulledAndServiced = (queuer: Queuer) =>
  queuer.pulledAt && queuer.servicedAt;
const toServiceTime = (queuer: Queuer) =>
  moment(queuer.servicedAt).diff(moment(queuer.pulledAt));
const sum = (total: number, serviceTime: number) => total + serviceTime;

const AverageNumberTimeProvider: React.SFC<Props> = ({ children }) => {
  return (
    <FirebaseQuery path="/line" on={true}>
      {(allNumbers?: QueuerMap) => {
        if (!allNumbers || isEmpty(allNumbers)) {
          return children(moment.duration(0));
        }
        const numberList = map(allNumbers, i => i);
        const onlyServiced = filter(numberList, pulledAndServiced);
        const serviceTimes = map(onlyServiced, toServiceTime);
        const total = serviceTimes.reduce(sum, 0);
        const average = serviceTimes.length ? total / serviceTimes.length : 0;
        return children(moment.duration(average));
      }}
    </FirebaseQuery>
  );
};

export default AverageNumberTimeProvider;
