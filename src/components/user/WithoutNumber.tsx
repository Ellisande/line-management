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
import { useSignIn } from "../../hooks/useSignIn";
import { useAuthenticated } from "../../hooks/useAuthenticated";

const styleBuilder = ({ colors: { text, button }, buttons, font }: Theme) => ({
  layout: {
    display: "flex",
    minHeight: "80vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    ":nth-child(n) > :first-child": {
      marginBottom: "10rem",
      marginTop: "10rem"
    },
    ":nth-child(n) > * + *": {
      marginTop: "5rem"
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
  },
  loginButton: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    backgroundColor: button.secondary,
    color: text.primary,
    fontSize: font.size.large
  },
  loginLayout: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15rem"
  },
  noMargin: {
    margin: "16px"
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
  const login = useSignIn();
  const loggedIn = useAuthenticated();

  if (!acceptingNumbers) {
    return <NotAccepting />;
  }
  return (
    <div css={style.layout}>
      <NumberDispenser onDispense={setLocalQueuerId} />
      {!loggedIn && (
        <div css={style.loginLayout}>
          <p css={style.noMargin}>Already have a number?</p>
          <button onClick={login} css={style.loginButton}>
            Log in
          </button>
        </div>
      )}

      <div css={style.wait}>
        <EstimatedWait waitTime={waitTime} className={style.text} />
      </div>
      <div css={style.text}>There are {lineCount} people ahead of you</div>
    </div>
  );
};
