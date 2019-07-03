/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { useStyle } from "../../theme/useStyle";
import { Theme } from "../../theme/theme";

const styleBuilder = ({ colors: { text, button }, font }: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonGroupLayout: {
    display: "flex",
    justifyContent: "center",
    ":nth-child(n) > *": {
      margin: 0
    }
  },
  buttonGroup: {
    cursor: "pointer",
    ":first-child": {
      borderRadius: "3rem 0 0 3rem"
    },
    ":last-child": {
      borderRadius: "0 3rem 3rem 0"
    }
  },
  hide: {
    display: "none"
  },
  selected: {
    backgroundColor: button.primary
  },
  disabled: {
    backgroundColor: button.disabled,
    color: text.secondary
  },
  upgrade: {
    fontSize: font.size.small,
    color: text.secondary
  }
});

interface ButtonGroupProps<T> {
  name: string;
  options: T[];
  proOptions?: T[];
  value: T;
  label: React.ReactNode;
  pro?: boolean;
}

type ButtonGroupComponent<T> = React.SFC<ButtonGroupProps<T>>;

export const ButtonGroup: ButtonGroupComponent<any> = ({
  options,
  name,
  value,
  label,
  proOptions = [],
  pro
}) => {
  const styles = useStyle(styleBuilder);
  const [selected, setSelected] = useState(value);
  const clickable = (nextValue: any) => setSelected(nextValue);
  return (
    <div css={styles.layout}>
      <h3>{label}</h3>
      <div css={styles.buttonGroupLayout}>
        {options.map(option => (
          <Radio
            name={name}
            label={option}
            value={option}
            selected={selected == option}
            onClick={clickable}
            key={option}
          />
        ))}
        {proOptions.map(option => (
          <Radio
            name={name}
            label={option}
            value={option}
            selected={selected == option}
            onClick={clickable}
            key={option}
            disabled={!pro}
          />
        ))}
      </div>
      {!pro && (
        <div css={styles.upgrade}>Upgrade to pro to unlock all options</div>
      )}
    </div>
  );
};

export const Radio: React.SFC<{
  label: string;
  name: string;
  value: any;
  selected: boolean;
  onClick?: (value: any) => void;
  disabled?: boolean;
  className?: string;
}> = ({ label, name, value, selected, onClick = () => {}, disabled }) => {
  const styles = useStyle(styleBuilder);
  const selectedStyle = selected ? styles.selected : undefined;
  const whenClicked = (e: any) => {
    e.preventDefault();
    if (!disabled) {
      onClick(value);
    }
  };
  const disabledStyle = disabled ? styles.disabled : undefined;
  return (
    <fieldset
      css={[styles.buttonGroup, selectedStyle, disabledStyle]}
      onClick={whenClicked}
    >
      <label htmlFor={name} css={styles.buttonGroup}>
        {label}
      </label>
      <input
        type="radio"
        name={name}
        id={name}
        value={value}
        css={styles.hide}
        disabled={disabled}
      />
    </fieldset>
  );
};
