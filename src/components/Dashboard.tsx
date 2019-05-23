/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { useCurrentQueuer } from "../hooks/useCurrentQueuer";
import { useLineCount } from "../hooks/useLineCount";
import { useAverageServiceTime } from "../hooks/useAverageServiceTime";
import * as moment from "moment";
import { Serving } from "./Serving";
import { LineQrLink } from "./LineQrLink";
import { useAcceptingNumbers } from "../hooks/useAcceptingNumbers";
import { useSignOut } from "../hooks/useSignOut";

const styleBuilder = ({ colors: { text }, font }: Theme) => ({
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
  const accepting = useAcceptingNumbers();
  useSignOut();
  return (
    <div css={styles.layout}>
      {accepting && <LineQrLink />}
      <Serving currentNumber={current.number} estimatedWait={estimatedWait} />
    </div>
  );
};
