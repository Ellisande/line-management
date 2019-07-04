/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useStyle } from "../../theme/useStyle";
import { Theme } from "../../theme/theme";
import { ReactNode, useState, ChangeEvent, useEffect } from "react";

const styleBuilder = ({
  colors: { text, button },
  buttons,
  font,
  inputs
}: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputLayout: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    ":nth-child(n) > * + *": {
      marginLeft: "3rem"
    }
  },
  button: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    cursor: "pointer",
    fontSize: font.size.large,
    borderColor: text.primary,
    borderWidth: "2px"
  },
  noneSelected: {
    backgroundColor: button.primary,
    color: text.primary
  },
  noneDeselected: {
    color: text.secondary,
    backgroundColor: "transparent"
  },
  input: {
    ...inputs.paddingOptions,
    maxWidth: "15vw",
    fontSize: font.size.large,
    ...inputs.borderOptions
  },
  upgrade: {
    fontSize: font.size.small,
    color: text.secondary
  }
});

interface Props {
  value: string;
  noneLabel: ReactNode;
  noneValue: any;
  label: ReactNode;
  onChange: (value: any) => void;
  pro?: boolean;
  placeholder?: string;
}

export const OptOutInput: React.SFC<Props> = ({
  value,
  noneLabel,
  noneValue,
  label,
  onChange,
  pro,
  placeholder
}) => {
  const styles = useStyle(styleBuilder);
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value)
  }, [value]);
  const noneSelected = inputValue === noneValue || (inputValue && inputValue.length == 0);
  const buttonStyle = noneSelected
    ? styles.noneSelected
    : styles.noneDeselected;
  const updateInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const tempValue = e.target.value;
    const sanitizedValue = tempValue.replace(/[^0-9]/g, "");
    setInputValue(sanitizedValue);
    onChange(sanitizedValue);
  };
  const selectNone = () => {
    setInputValue(noneValue);
    onChange(noneValue);
  };
  const notProValue = "Requires Pro";
  const displayValue = (function() {
    if (!pro) {
      return notProValue;
    }
    if (noneSelected) {
      return "";
    }
    return inputValue;
  })();
  const notProStyle = !pro ? styles.notProInput : undefined;
  return (
    <div css={styles.layout}>
      <h3>{label}</h3>
      <div css={styles.inputLayout}>
        {pro && (
          <input
            type="text"
            value={displayValue}
            css={[styles.inputGroup, styles.input, notProStyle]}
            onChange={updateInputValue}
            disabled={!pro}
            placeholder={placeholder}
          />
        )}
        {pro && <div>Or</div>}
        <button
          css={[styles.inputGroup, styles.button, buttonStyle]}
          onClick={selectNone}
        >
          {noneLabel}
        </button>
      </div>
      {!pro && <div css={styles.upgrade}>Upgrade to pro to specify</div>}
    </div>
  );
};
