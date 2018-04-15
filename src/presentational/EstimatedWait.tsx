import * as React from 'react';
import * as moment from 'moment';

interface EstimatedWaitProps {
  waitTime: moment.Duration;
}

const EstimatedWait: React.SFC<EstimatedWaitProps> =
  ({ waitTime }) => <div>Estimated Wait: {waitTime.humanize()}</div>;

export default EstimatedWait;
