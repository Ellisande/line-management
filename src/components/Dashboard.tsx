/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { useCurrentQueuer } from "../hooks/useCurrentQueuer";
import { useLineCount } from "../hooks/useLineCount";
import { useAverageServiceTime } from "../hooks/useAverageServiceTime";
import { EstimatedWait } from "./EstimatedWait";
import * as moment from "moment";
import { Serving } from "./Serving";

const styleBuilder = ({ colors: { text } }: Theme) => ({
  layout: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: text.primary,
    ":nth-child(n) * + *": {
      marginTop: "20px"
    }
  }
});

export const Dashboard = () => {
  const styles = useStyle(styleBuilder);
  const current = useCurrentQueuer() || { number: 0 };
  const lineCount = useLineCount(undefined);
  const averageWait = useAverageServiceTime();
  const estimatedWait = moment.duration(lineCount * averageWait);
  return (
    <div css={styles.layout}>
      <Serving currentNumber={current.number} estimatedWait={estimatedWait} />
    </div>
  );
};
