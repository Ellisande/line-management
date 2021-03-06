/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Theme } from "../theme/theme";
import { useStyle } from "../theme/useStyle";
import { useLineName } from "../context/lineNameContext";
const QRCode = require("qrcode.react");

const styleBuilder = ({ colors: { text, background }, font }: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  joinNow: {
    color: text.secondary,
    fontSize: font.size.small
  },
  qr: {
    backgroundColor: background,
    color: text.primary
  }
});

export const LineQrLink = () => {
  const styles = useStyle(styleBuilder);
  const lineName = useLineName();

  return (
    <div css={styles.layout}>
      <QRCode
        value={`http://line.management/line/${lineName}`}
        bgColor={styles.qr.backgroundColor}
        fgColor={styles.qr.color}
      />
      <p css={styles.joinNow}>Scan to join the line now!</p>
    </div>
  );
};
