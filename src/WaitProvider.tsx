import * as React from 'react';
import * as moment from 'moment';

import AverageNumberTimeProvider from './AverageNumberTimeProvider';
import NumbersAheadProvider from './NumbersAheadProvider';

interface Props {
    waitTimeFor: number;
    children: (waitTime: moment.Duration) => JSX.Element;
}

const WaitProvider: React.SFC<Props> = ({ children, waitTimeFor }) => {
    return (
        <AverageNumberTimeProvider>
            {
                averageNumberTime => (
                    <NumbersAheadProvider numberToCheck={waitTimeFor}>
                        {
                            numbersAhead => {
                                const averageTimeMillis = averageNumberTime.asMilliseconds();
                                // console.log('Average time in millis is', averageTimeMillis);
                                // console.log('Time from provider', averageNumberTime.humanize());
                                const estimateMillis = numbersAhead * averageTimeMillis;
                                // console.log('Estimated wait in millis', estimateMillis);
                                const estimate = moment.duration(estimateMillis);
                                // console.log('The actual estimate is', estimate.humanize());
                                return children(estimate);
                            }
                        }
                    </NumbersAheadProvider>
                )
            }
        </AverageNumberTimeProvider>
    );
};

export default WaitProvider;