/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as moment from "moment";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
//
interface EstimatedWaitProps {
  className?: string;
  waitTime: moment.Duration;
}

const defaultProps: Partial<EstimatedWaitProps> = {
  className: ""
};

const styleBuilder = ({ colors: { text } }: Theme) => ({
  important: {
    color: text.important
  }
});

const EstimatedWait: React.SFC<EstimatedWaitProps> = ({
  waitTime,
  className
}) => {
  const style = useStyle(styleBuilder);
  return (
    <div className={className}>
      Estimated Wait: <span css={style.important}>{waitTime.humanize()}</span>
    </div>
  );
};

EstimatedWait.defaultProps = defaultProps;

export { EstimatedWait };
