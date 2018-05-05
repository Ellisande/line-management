interface TextColors {
  primary: string;
  secondary: string;
}

interface ButtonColors {
  primary: string;
  cancel: string;
  secondary: string;
  tertiary: string;
}

interface Colors {
  text: TextColors;
  button: ButtonColors;
  lowLight: string;
  highLight: string;
  background: string;
  outThere: string;
}

interface Theme {
  colors: Colors;
}

const defaultTheme: Theme = {
  colors: {
    text: {
      primary: "white",
      secondary: "dimgrey"
    },
    button: {
      primary: "#008E43",
      secondary: "#483E56",
      cancel: "#AA3F39",
      tertiary: "#8E6D97"
    },
    lowLight: "#0A020F",
    background: "#331D44",
    highLight: "#B09DC2",
    outThere: "#875975"
  }
};

export { defaultTheme, Theme };
