import * as React from "react";
import * as moment from "moment";

interface EstimatedWaitProps {
  className?: string;
  waitTime: moment.Duration;
}

const defaultProps: Partial<EstimatedWaitProps> = {
  className: ""
};

const EstimatedWait: React.SFC<EstimatedWaitProps> = ({
  waitTime,
  className
}) => <div className={className}>Estimated Wait: {waitTime.humanize()}</div>;

EstimatedWait.defaultProps = defaultProps;

export default EstimatedWait;
