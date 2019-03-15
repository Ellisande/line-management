/** @jsx jsx */
import { jsx } from "@emotion/core";
import moment from "moment";
import { YourNumber } from "./YourNumber";
import { OnTheWay } from "./OnTheWay";
import { Theme } from "../../theme/theme";
import { useStyle } from "../../theme/useStyle";
import { SkipNumber } from "../SkipNumber";
import { Queuer } from "../../Queuer";
import { useNextQueuer } from "../../hooks/useNextQueuer";
import { EstimatedWait } from "../EstimatedWait";
import { useAverageServiceTime } from "../../hooks/useAverageServiceTime";
import { useLineCount } from "../../hooks/useLineCount";
import { NotComing } from "./NotComing";

interface ClassName {
  className?: string;
}

const CallToAction: React.SFC<ClassName> = ({ className, children }) => (
  <div className={className}>{children}</div>
);
const Informational: React.SFC<ClassName> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const stylesBuilder = ({ colors, buttons, font }: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: colors.text.primary,
    padding: "1rem",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  subtle: {
    fontSize: font.size.normal
  },
  leaving: {
    fontSize: font.size.normal,
    color: colors.text.primary,
    backgroundColor: colors.button.cancel,
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    marginTop: "10rem"
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  actions: {
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
  localQueuer: Queuer;
  clearLocalQueuerId: () => void;
}

export const WithNumber: React.SFC<Props> = ({
  localQueuer,
  clearLocalQueuerId
}) => {
  const styles = useStyle(stylesBuilder);
  const nextQueuer = useNextQueuer();
  const averageServiceTime = useAverageServiceTime();
  const numbersAhead = useLineCount(localQueuer.number);
  const waitTime = moment.duration(averageServiceTime * numbersAhead);
  const isNext = nextQueuer && localQueuer.id == nextQueuer.id;
  const isOnTheWay = localQueuer.onTheWayAt;
  return (
    <div css={styles.layout}>
      <CallToAction>
        <YourNumber number={localQueuer.number} queuerId={localQueuer.id} />
        {isNext && !isOnTheWay && (
          <div css={styles.actions}>
            <SkipNumber queuerId={localQueuer.id}>Skip Me</SkipNumber>
            <OnTheWay />
          </div>
        )}
        {isOnTheWay && <div>See you soon!</div>}
      </CallToAction>
      <Informational css={styles.center}>
        <EstimatedWait waitTime={waitTime} />
        <div css={styles.subtle}>
          There are {numbersAhead} people in front of you
        </div>
      </Informational>
      <NotComing localQueuer={localQueuer} onLeave={clearLocalQueuerId} />
    </div>
  );
};
