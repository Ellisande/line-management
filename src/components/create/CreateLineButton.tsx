/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useStyle } from "../../theme/useStyle";
import { Theme } from "../../theme/theme";
import { Link } from "react-router-dom";

const styleBuilder = ({ font, colors, buttons }: Theme) => ({
  createButton: {
    fontSize: font.size.xl,
    color: colors.text.primary,
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: colors.button.primary,
    whiteSpace: 'nowrap'
  }
});

interface Props { }

export const CreateLineButton: React.SFC<Props> = () => {
  const styles = useStyle(styleBuilder);
  return (
    <Link to="/create" css={styles.createButton}>
      Create a Line
    </Link>
  );
};
