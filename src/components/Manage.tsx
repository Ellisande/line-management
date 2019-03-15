/** @jsx jsx */
import { jsx } from "@emotion/core";
import moment from "moment";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { useCurrentQueuer } from "../hooks/useCurrentQueuer";
import { BigNumber } from "./user/YourNumber";
import { useCallback } from "react";
import { useMarkServiced, usePullNumber } from "../hooks/useQueuerUpdater";
import { useNextQueuer } from "../hooks/useNextQueuer";
import { SkipNumber } from "./SkipNumber";
import { useAverageServiceTime } from "../hooks/useAverageServiceTime";
import { useLineCount } from "../hooks/useLineCount";
import { useAcceptingNumbers } from "../hooks/useAcceptingNumbers";
import { useCurrentUpdater } from "../hooks/useCurrentUpdater";
import { Authenticated } from "./Authenticated";

const styleBuilder = ({ colors, font, buttons }: Theme) => ({
  bigNumber: {
    fontSize: font.size.huge,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    color: colors.text.important
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "2rem"
    },
    paddingBottom: "3rem"
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ":nth-child(n) > * + *": {
      marginTop: "2rem"
    }
  },
  subtle: {
    fontSize: font.size.small
  },
  leaving: {
    fontSize: font.size.large
  },
  spaceTop: {
    marginTop: "2rem"
  },
  action: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    fontSize: font.size.large,
    color: colors.text.primary,
    backgroundColor: colors.button.primary
  },
  important: {
    color: colors.text.important
  },
  sadButton: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.cancel,
    color: colors.text.primary,
    fontSize: font.size.normal
  }
});

export const Manage = () => {
  const styles = useStyle(styleBuilder);
  const currentQueuer = useCurrentQueuer();
  const nextQueuer = useNextQueuer();
  const currentNumber = currentQueuer ? currentQueuer.number : 0;
  const currentId = currentQueuer ? currentQueuer.id : "a";
  const markServiced = useMarkServiced(
    currentQueuer ? currentQueuer.id : undefined
  );
  const markPulled = usePullNumber(nextQueuer ? nextQueuer.id : undefined);
  const setCurrent = useCurrentUpdater();
  const averageServiceTime = useAverageServiceTime();
  const peopleWaiting = useLineCount(undefined);
  const estimatedWait = moment.duration(averageServiceTime * peopleWaiting);
  const doneAt = moment().add(estimatedWait);
  const acceptingNumbers = useAcceptingNumbers();

  const markAndPull = useCallback(() => {
    if (!currentQueuer) {
      return () => {};
    }
    markServiced(moment());
    if (nextQueuer) {
      markPulled(moment());
      setCurrent(nextQueuer.id);
    }
  }, [currentQueuer, nextQueuer]);

  const pull = useCallback(() => {
    if (!nextQueuer) {
      return () => {};
    }
    markPulled(moment());
    setCurrent(nextQueuer.id);
  }, [nextQueuer]);

  const serviced = useCallback(() => {
    if (!currentQueuer) {
      return () => {};
    }
    markServiced(moment());
  }, [currentQueuer]);
  return (
    <Authenticated>
      <div css={styles.layout}>
        {currentQueuer && (
          <BigNumber
            number={currentNumber}
            queuerId={currentId}
            label="Now Serving:"
          />
        )}

        {currentQueuer && nextQueuer && (
          <button css={styles.action} onClick={markAndPull}>
            Complete
          </button>
        )}

        {currentQueuer && !nextQueuer && (
          <button css={styles.action} onClick={serviced}>
            Complete
          </button>
        )}

        {currentQueuer && (
          <SkipNumber queuerId={currentQueuer.id}>Skip</SkipNumber>
        )}

        {!currentQueuer && nextQueuer && (
          <button css={styles.action} onClick={pull}>
            Call First
          </button>
        )}

        <div>
          <div>
            Wait time:{" "}
            <span css={styles.important}>{estimatedWait.humanize()}</span>
          </div>
          <div>
            Done at:{" "}
            <span css={styles.important}>{doneAt.format("hh:mma")}</span>
          </div>
        </div>
        <div css={styles.actions}>
          {acceptingNumbers && (
            <button css={styles.sadButton} onClick={() => {}}>
              Stop Accepting
            </button>
          )}
          {!acceptingNumbers && (
            <button css={styles.action} onClick={() => {}}>
              Start Accepting
            </button>
          )}
          <button css={styles.sadButton} onClick={() => {}}>
            Reset All Numbers
          </button>
        </div>
      </div>
    </Authenticated>
  );
};
