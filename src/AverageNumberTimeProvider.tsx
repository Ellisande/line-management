import * as React from 'react';
import * as moment from 'moment';
import { isEmpty, filter, map } from 'lodash';
import { DataProvider } from './firebaseHelper';
import { Queuer } from './Queuer';

interface Props {
    path: string;
    children: (averageTime: moment.Duration) => JSX.Element;
}

interface QueuerMap {
    [key: string]: Queuer;
}

const pulledAndServiced = (queuer: Queuer) => queuer.pulledAt && queuer.servicedAt;
const toServiceTime = (queuer: Queuer) => moment(queuer.servicedAt).diff(moment(queuer.pulledAt));
const sum = (total: number, serviceTime: number) => total + serviceTime;

const AverageNumberTimeProvider: React.SFC<Props> = ({ path, children }) => {
    return (
        <DataProvider path={`${path}/line`} updateOn="child_changed">
            {
                (allNumbers?: QueuerMap) => {
                    if (!allNumbers || isEmpty(allNumbers)) {
                        // console.error('I could not find any numbers', Math.random());
                        return children(moment.duration(0));
                    }
                    // console.log('What is this?', allNumbers);
                    const numberList = map(allNumbers, i => i);
                    // console.log('All numbers', JSON.stringify(numberList));
                    const onlyServiced = filter(numberList, pulledAndServiced);
                    // console.log('Only servied', onlyServiced);
                    const serviceTimes = map(onlyServiced, toServiceTime);
                    // console.log('Service times', serviceTimes);
                    const total = serviceTimes.reduce(sum, 0);
                    // console.log('Total time is', total);
                    const average = serviceTimes.length ? total / serviceTimes.length : 0;
                    // console.log('Average ticket time', average);
                    return children(moment.duration(average));
                }
            }
        </DataProvider>
    );
};

export default AverageNumberTimeProvider;