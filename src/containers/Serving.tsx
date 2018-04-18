import * as React from 'react';
import * as moment from 'moment';

import CurrentQueuerProvider from '../providers/CurrentQueuerProvider';
import EstimatedWait from '../presentational/EstimatedWait';

interface ServingProps {
    currentNumber: number;
    estimatedWait: moment.Duration;
}

const Serving: React.SFC<ServingProps> = ({ estimatedWait }) => {
    return (
      <CurrentQueuerProvider>
        {
          currentQueuer => currentQueuer ? (
            <div>
              <div>Currently Serving: {currentQueuer.number}</div>
              <EstimatedWait waitTime={estimatedWait} />
            </div>
          ) : <div>Not Current Serving</div>
        }
      </CurrentQueuerProvider>
    );
  };

export default Serving;