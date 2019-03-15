/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { EstimatedWait } from "./EstimatedWait";
import { useStyle } from "../theme/useStyle";
import { Theme } from "../theme/theme";
import * as moment from "moment";

const styleBuilder = ({ colors: { text } }: Theme) => ({
  important: {
    color: text.important
  }
});

interface Props {
  currentNumber: number;
  estimatedWait: moment.Duration;
}

export const Serving: React.SFC<Props> = ({ currentNumber, estimatedWait }) => {
  const styles = useStyle(styleBuilder);
  return (
    <Fragment>
      <div>
        Currently Serving: <span css={styles.important}>{currentNumber}</span>
      </div>
      <EstimatedWait waitTime={estimatedWait} />
    </Fragment>
  );
};
