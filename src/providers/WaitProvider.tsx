import * as React from 'react';
import * as moment from 'moment';

import AverageNumberTimeProvider from './AverageNumberTimeProvider';
import NumbersAheadProvider from './NumbersAheadProvider';
import LineCountProvider from './LineCountProvider';

interface Props {
    waitTimeFor?: number;
    children: (waitTime: moment.Duration) => JSX.Element;
}

const WaitProvider: React.SFC<Props> = ({ children, waitTimeFor }) => {
    return (
        <AverageNumberTimeProvider>
            {
                averageNumberTime => waitTimeFor ? (
                    <NumbersAheadProvider numberToCheck={waitTimeFor}>
                        {
                            numbersAhead => {
                                const averageTimeMillis = averageNumberTime.asMilliseconds();
                                const estimateMillis = numbersAhead * averageTimeMillis;
                                const estimate = moment.duration(estimateMillis);
                                return children(estimate);
                            }
                        }
                    </NumbersAheadProvider>
                ) : (
                    <LineCountProvider>
                        {
                            numbersAhead => {
                                const averageTimeMillis = averageNumberTime.asMilliseconds();
                                const estimateMillis = numbersAhead * averageTimeMillis;
                                const estimate = moment.duration(estimateMillis);
                                return children(estimate);
                            }
                        }
                    </LineCountProvider>
                )
            }
        </AverageNumberTimeProvider>
    );
};

export default WaitProvider;