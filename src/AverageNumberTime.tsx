import * as React from 'react';
import AverageNumberTimeProvider from './AverageNumberTimeProvider';

interface Props {
}

const AverageNumberTime: React.SFC<Props> = ({}) => (
    <AverageNumberTimeProvider>
        {averageTime => <div>The average ticket takes {averageTime.humanize()}</div>}
    </AverageNumberTimeProvider>
);

export default AverageNumberTime;