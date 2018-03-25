import * as React from 'react';
import * as moment from 'moment';
import { isEmpty, filter, map } from 'lodash';
import { DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';

interface Props {
    path: string;
    children: (averageTime: moment.Duration) => JSX.Element;
}

const pulledAndServiced = (queuer: Queuer) => queuer.pulledAt && queuer.servicedAt;
const toServiceTime = (queuer: Queuer) => moment(queuer.pulledAt).diff(moment(queuer.servicedAt));
const sum = (total: number, serviceTime: number) => total + serviceTime;

const AverageNumberTimeProvider: React.SFC<Props> = ({ path, children }) => {
    return (
        <DataProvider path={path} updateOn="child_changed">
            {
                (allNumbers?: Queuer[]) => {
                    if (!allNumbers || isEmpty(allNumbers)) {
                        return children(moment.duration(0));
                    }
                    const onlyServiced = filter(allNumbers, pulledAndServiced);
                    const serviceTimes = map(onlyServiced, toServiceTime);
                    const total = serviceTimes.reduce(sum, 0);
                    const average = serviceTimes.length ? total / serviceTimes.length : 0;
                    return children(moment.duration(average));
                }
            }
        </DataProvider>
    );
};

export default AverageNumberTimeProvider;