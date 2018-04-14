import * as React from 'react';
import AverageNumberTimeProvider from './AverageNumberTimeProvider';

interface Props {
    path: string;
}

const AverageNumberTime: React.SFC<Props> = ({ path }) => (
    <AverageNumberTimeProvider path={path}>
        {averageTime => <div>The average ticket takes {averageTime.humanize()}</div>}
    </AverageNumberTimeProvider>
);

export default AverageNumberTime;