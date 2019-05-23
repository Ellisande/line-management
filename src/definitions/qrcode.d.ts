declare module "qrcode.react" {
  interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: "L" | "M" | "Q" | "H";
    renderAs?: "svg" | "canvas";
  }

  export class QRCode extends React.Component<QRCodeProps, {}> {}
}
