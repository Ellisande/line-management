import * as React from "react";
import * as moment from "moment";
import { Theme } from "../styles/theme";
import { Style } from "../styles/ThemeProvider";
import { css } from "aphrodite";

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
}) => (
  <Style buildStyles={styleBuilder}>
    {({ important }) => (
      <div className={className}>
        Estimated Wait:{" "}
        <span className={css(important)}>{waitTime.humanize()}</span>
      </div>
    )}
  </Style>
);

EstimatedWait.defaultProps = defaultProps;

export default EstimatedWait;
