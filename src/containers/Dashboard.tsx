import * as React from 'react';

import Serving from '../presentational/Serving';
import CurrentQueuerProvider from '../providers/CurrentQueuerProvider';
import WaitProvider from '../providers/WaitProvider';

const Dashboard: React.SFC<{}> = () => {
    return (
        <CurrentQueuerProvider>
            {
                currentQueuer => currentQueuer ? (
                    <WaitProvider>
                        {waitTime => <Serving currentNumber={currentQueuer.number} estimatedWait={waitTime} />}
                    </WaitProvider>
                ) : <div>Loading</div>
            }
        </CurrentQueuerProvider>
    );
};

export default Dashboard;