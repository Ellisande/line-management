/** @jsx jsx */
import { jsx } from "@emotion/core";
import moment from "moment";
import { useStyle } from "../../theme/useStyle";
import { Theme } from "../../theme/theme";
import { useAcceptingNumbers } from "../../hooks/useAcceptingNumbers";
import { useLineCount } from "../../hooks/useLineCount";
import { useAverageServiceTime } from "../../hooks/useAverageServiceTime";
import { EstimatedWait } from "../EstimatedWait";
import { NumberDispenser } from "../NumberDispenser";
import { NotAccepting } from "../NotAccepting";

const styleBuilder = ({ colors: { text } }: Theme) => ({
  layout: {
    display: "flex",
    minHeight: "80vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    ":nth-child(n) > * + *": {
      marginTop: "10rem"
    }
  },
  text: {
    color: text.primary,
    textAlign: "center"
  },
  wait: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  }
});

interface Props {
  setLocalQueuerId: (id: string) => void;
}

export const WithoutNumber: React.SFC<Props> = ({ setLocalQueuerId }) => {
  const style = useStyle(styleBuilder);
  const acceptingNumbers = useAcceptingNumbers();
  const lineCount = useLineCount(undefined);
  const averageServiceTime = useAverageServiceTime();
  const waitTime = moment.duration(lineCount * averageServiceTime);

  if (!acceptingNumbers) {
    return <NotAccepting />;
  }
  return (
    <div css={style.layout}>
      <NumberDispenser onDispense={setLocalQueuerId} />
      <div css={style.wait}>
        <EstimatedWait waitTime={waitTime} className={style.text} />
      </div>
      <div css={style.text}>There are {lineCount} people ahead of you</div>
    </div>
  );
};
