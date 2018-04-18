import * as React from 'react';
import * as moment from 'moment';

import EstimatedWait from '../presentational/EstimatedWait';

interface ServingProps {
    currentNumber: number;
    estimatedWait: moment.Duration;
}

const Serving: React.SFC<ServingProps> = ({ estimatedWait, currentNumber }) => {
    return (  
        <div>
            <div>Currently Serving: {currentNumber}</div>
            <EstimatedWait waitTime={estimatedWait} />
        </div>
    );
  };

export default Serving;