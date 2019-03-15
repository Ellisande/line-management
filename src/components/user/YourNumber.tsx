/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useStyle } from "../../theme/useStyle";
import { Theme } from "../../theme/theme";
import { generateConfirmationCode } from "../../confirmation/generateConfirmationCode";

const styleBuilder = ({ colors, font }: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  bigNumber: {
    fontSize: font.size.huge,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    color: colors.text.important
  },
  subtle: {
    fontSize: font.size.tiny,
    color: colors.text.secondary
  }
});

interface Props {
  number: number;
  queuerId: string;
}

interface ExtendedProps extends Props {
  label: string;
}

export const YourNumber: React.SFC<Props> = ({ number, queuerId }) => (
  <BigNumber number={number} queuerId={queuerId} label="Your number is:" />
);

export const BigNumber: React.SFC<ExtendedProps> = ({
  number,
  queuerId,
  label
}) => {
  const styles = useStyle(styleBuilder);
  const confirmationCode = generateConfirmationCode(queuerId);
  return (
    <div css={styles.layout}>
      <div>{label}</div>
      <div css={styles.bigNumber}>{number}</div>
      <div css={styles.subtle}>Confirmation code: {confirmationCode}</div>
    </div>
  );
};
