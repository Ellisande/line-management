/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useAcceptingNumbers } from "../hooks/useAcceptingNumbers";
import { NotAccepting } from "./NotAccepting";
import { Theme } from "../theme/theme";
import { useState } from "react";
import { NumberDispenser } from "./NumberDispenser";
import { Serving } from "./Serving";
import { useCurrentQueuer } from "../hooks/useCurrentQueuer";
import { useLineCount } from "../hooks/useLineCount";
import { useEstimatedWait } from "../hooks/useEstimatedWait";
import { YourNumber } from "./user/YourNumber";
import { useStyle } from "../theme/useStyle";
import { useQueuer } from "../hooks/useQueuer";
import { Authenticated } from "./Authenticated";
import { LineQrLink } from "./LineQrLink";

const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  layout: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  done: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: colors.button.primary,
    fontSize: font.size.huge,
    color: colors.text.primary,
    fontWeight: "bold",
    margin: "2rem"
  },
  hasNumberLayout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  reminder: {
    color: colors.text.primary,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export const Terminal = () => {
  const styles = useStyle(styleBuilder);
  const acceptingNumbers = useAcceptingNumbers();
  const [takenQueuer, setTakenQueuer] = useState<string | undefined>();
  const currentQueuer = useCurrentQueuer() || { number: 0 };
  const lineCount = useLineCount(undefined);
  const estimatedWait = useEstimatedWait(lineCount);
  const queuer = useQueuer(takenQueuer);
  if (!acceptingNumbers) {
    return <NotAccepting />;
  }
  if (queuer) {
    return (
      <div css={styles.hasNumberLayout}>
        <YourNumber number={queuer.number} queuerId={queuer.id} />
        <div css={styles.reminder}>
          Take a picture or write down your number!
        </div>
        <button css={styles.done} onClick={() => setTakenQueuer(undefined)}>
          Done
        </button>
      </div>
    );
  }
  return (
    <Authenticated>
      <div css={styles.layout}>
        <LineQrLink />
        <NumberDispenser onDispense={id => setTakenQueuer(id)} />
        <Serving
          currentNumber={currentQueuer.number}
          estimatedWait={estimatedWait}
        />
      </div>
    </Authenticated>
  );
};
