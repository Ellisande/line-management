import * as React from "react";
import * as moment from "moment";

import EstimatedWait from "../presentational/EstimatedWait";
import { Style } from "../styles/ThemeProvider";
import { Theme } from "../styles/theme";
import { css } from "aphrodite";

interface ServingProps {
  currentNumber: number;
  estimatedWait: moment.Duration;
}

const styleBuilder = ({ colors: { text } }: Theme) => ({
  important: {
    color: text.important
  }
});

const Serving: React.SFC<ServingProps> = ({ estimatedWait, currentNumber }) => {
  return (
    <Style buildStyles={styleBuilder}>
      {styles => (
        <div>
          <div>
            Currently Serving:{" "}
            <span className={css(styles.important)}>{currentNumber}</span>
          </div>
          <EstimatedWait waitTime={estimatedWait} />
        </div>
      )}
    </Style>
  );
};

export default Serving;
