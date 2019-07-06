/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useStyle } from "../../theme/useStyle";
import { Theme } from "../../theme/theme";
import { useState, ChangeEvent, Fragment, useCallback } from "react";
import { useLines } from "../../hooks/useLines";
import { useLineCreator } from "../../hooks/useLineCreator";
import { useAuthenticated } from "../../hooks/useAuthenticated";
import { Authenticated } from "../Authenticated";
import { match } from "react-router";
import { History } from "history";

const styleBuilder = ({
  colors: { text, background, button },
  font,
  buttons
}: Theme) => ({
  page: {
    color: text.primary,
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "2rem",
    fontSize: font.size.large,
    ":nth-child(n) > * + *": {
      marginTop: "3rem"
    }
  },
  input: {
    ...buttons.borderOptions,
    fontSize: font.size.large,
    textAlign: "center"
  },
  error: {
    fontSize: font.size.small,
    color: text.error
  },
  errorLayout: {
    display: "flex",
    flexDirection: "column",
    ":nth-child(n) > * + *": {
      marginTop: "0.3rem"
    }
  },
  button: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    color: text.primary,
    fontSize: font.size.large,
    transition: "all 0.8s ease-out",
    cursor: "pointer"
  },
  createButton: {
    color: text.primary,
    backgroundColor: button.primary
  },
  disabledButton: {
    color: text.secondary,
    backgroundColor: button.disabled
  }
});

interface Props {
  match: match,
  history: History
}

const validate = (newName: string, lineNames: string[]) => {
  const violations: string[] = [];
  const sanitized = newName.toLowerCase();
  const collision = lineNames.find(name => name == sanitized);
  if (collision) {
    const collisionMessage = `A line called ${newName} already exists, try another name`;
    violations.push(collisionMessage);
  }
  if (sanitized.length < 1) {
    const tooShortMessage = "A line name must contain at least 2 characters";
    violations.push(tooShortMessage);
  }
  return violations;
};

const InputError: React.SFC<{ violations: string[] }> = ({ violations }) => {
  const styles = useStyle(styleBuilder);
  return (
    <div css={styles.errorLayout}>
      {violations.map(violation => (
        <span key={violation} css={styles.error}>
          {violation}
        </span>
      ))}
    </div>
  );
};

export const CreateLine: React.SFC<Props> = (
  { history, match }
) => {
  const [newName, setNewName] = useState("");
  const [touched, setTouched] = useState(false);
  const styles = useStyle(styleBuilder);
  const lineNames = useLines();
  const lineCreator = useLineCreator();
  const authenticated = useAuthenticated();
  const createLine = useCallback(() => {
    const safeName = encodeURI(newName);
    lineCreator(newName);
    history.push(`line/${safeName}`)
  }, [newName, lineCreator]);
  const updateName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const pendingName = e.target.value;
      if (pendingName.length > 0) {
        setTouched(true);
      }
      setNewName(pendingName);
    },
    [setTouched, setNewName]
  );
  const violations = validate(newName, lineNames);
  const valid = violations.length == 0;
  const buttonStyle = valid && authenticated ? styles.createButton : styles.disabledButton;
  return (
    <Authenticated>
      <div css={styles.page}>
        <label htmlFor="line_name">Choose a descriptive name for your line</label>
        <input
          css={styles.input}
          type="text"
          name="line_name"
          id="line_name"
          onChange={updateName}
        />

        <button
          css={[styles.button, buttonStyle]}
          disabled={!valid || !authenticated}
          onClick={createLine}
        >
          Create
      </button>

        {touched && violations.length >= 1 && (
          <InputError violations={violations} />
        )}
      </div>
    </Authenticated>
  );
};
